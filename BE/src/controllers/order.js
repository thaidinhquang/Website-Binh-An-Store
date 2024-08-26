import mongoose from "mongoose"; // Add this line
import Stripe from "stripe";
import Order from "../models/Order.js";
import { ORDER_STATUS } from "../constants/order.js";
import { ROLES } from "../constants/Role.js";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";
import ProductItem from "../models/ProductItem.js";
import Cart from "../models/Cart.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @POST CHECKOUT SESSION WITH STRIPE
export const checkoutSession = async (req, res) => {
  const lineItems = req.body.items.map((item) => ({
    price_data: {
      currency: req.body.currency,
      product_data: {
        name: item.name,
        name: item.name,
        images: [item.image ?? ""],
        metadata: {
          ...(item.variants && { variants: JSON.stringify(item.variants) }),
          productId: item.productId,
        },
      },
      unit_amount: item.price,
      tax_behavior: "exclusive",
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    phone_number_collection: {
      enabled: true,
    },
    shipping_address_collection: {
      allowed_countries: ["VN", "US"],
    },
    billing_address_collection: "required",
    metadata: {
      userId: req.body.userId,
    },
    payment_method_types: ["card"],
    mode: "payment",
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  return res.status(200).json({
    sessionId: session.id,
    sessionUrl: session.url,
  });
};

// @POST CREATE ORDER BY CASH
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = new Order({
      ...req.body,
      userId: req.user?._id?.toString(),
    });

    await order.save({ session });

    // Loop through the products in the order and decrease the stock
    for (const item of req.body.items) {
      const productItem = await ProductItem.findById(item.productId).session(
        session
      );

      if (!productItem) {
        throw new Error("Product not found");
      }

      if (productItem.stock < item.quantity) {
        throw new Error("Không đủ hàng");
      }

      productItem.stock -= item.quantity;
      await productItem.save({ session });
    }

    // Clear the cart after successful order
    const userId = req.user?._id?.toString();
    const cart = await Cart.findOne({ userId }).session(session);
    if (cart) {
      for (const item of req.body.items) {
        const productIndex = cart.products.findIndex(
          (product) => product.productId.toString() === item.productId
        );
        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
        }
      }
      await cart.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Đặt hàng thành công",
      success: true,
      metadata: null,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @POST CREATE ORDER BY CARD
// export const createStripeOrder = async (session) => {
//   try {
//     const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

//     const detailedLineItems = [];

//     for (const item of lineItems.data) {
//       if (item.price && item.price.product) {
//         const product = await stripe.products.retrieve(item.price.product);
//         detailedLineItems.push({
//           ...item,
//           image: product.images[0] ?? "",
//           name: product.name,
//           productId: product.metadata.productId,
//         });
//       }
//     }

//     const dataItems = detailedLineItems.map((item) => ({
//       productId: item.productId,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.amount_total,
//       image: item.image,
//     }));

//     const order = new Order({
//       userId: session.metadata && session.metadata?.userId,
//       items: dataItems,
//       totalPrice: session.amount_total,
//       paymentMethod: session.payment_method_types[0],
//       shippingAddress: session.customer_details?.address,
//       customerInfo: {
//         name: session.customer_details?.name,
//         email: session.customer_details?.email,
//         phone: session.customer_details?.phone,
//       },
//       isPaid: session.payment_status === "paid",
//     });

//     await order.save();

//     console.log("Order saved successfully");
//   } catch (error) {
//     return console.error(
//       "Error processing checkout.session.completed event:",
//       error
//     );
//   }
// };

export const createStripeOrder = async (session) => {
  const mongooseSession = await mongoose.startSession();
  mongooseSession.startTransaction();

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const detailedLineItems = [];

    for (const item of lineItems.data) {
      if (item.price && item.price.product) {
        const product = await stripe.products.retrieve(item.price.product);
        detailedLineItems.push({
          ...item,
          image: product.images[0] ?? "",
          name: product.name,
          productId: product.metadata.productId,
          variants: product.metadata.variants
            ? JSON.parse(product.metadata.variants)
            : [],
        });
      }
    }

    const dataItems = detailedLineItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.amount_total,
      image: item.image,
      variants: item.variants,
    }));

    const order = new Order({
      userId: session.metadata && session.metadata?.userId,
      items: dataItems,
      totalPrice: session.amount_total,
      paymentMethod: session.payment_method_types[0],
      shippingAddress: session.customer_details?.address,
      customerInfo: {
        name: session.customer_details?.name,
        email: session.customer_details?.email,
        phone: session.customer_details?.phone,
      },
      isPaid: session.payment_status === "paid",
    });

    await order.save();

    // Loop through the products in the order and decrease the stock
    for (const item of dataItems) {
      const productItem = await ProductItem.findById(item.productId).session(
        mongooseSession
      );

      if (!productItem) {
        throw new Error("Product not found");
      }

      if (productItem.stock < item.quantity) {
        throw new Error("Không đủ hàng");
      }

      productItem.stock -= item.quantity;
      await productItem.save({ mongooseSession });
    }

    // Clear the cart after successful order
    const userId = session.metadata?.userId;
    const cart = await Cart.findOne({ userId }).session(mongooseSession);
    if (cart) {
      for (const item of dataItems) {
        const productIndex = cart.products.findIndex(
          (product) => product.productId.toString() === item.productId
        );
        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
        }
      }
      await cart.save({ mongooseSession });
    }

    await mongooseSession.commitTransaction();
    mongooseSession.endSession();

    console.log("Order saved successfully");

    // Sending email after saving the order
    const user = await User.findById(session.metadata?.userId);

    if (!user) {
      return console.error("User not found for the given session");
    }

    const emailSent = sendEmail(
      user.email,
      "Cảm ơn quý khách đã đặt hàng",
      `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Nguyen Tuan Anh</a>
        </div>
        <p style="font-size:1.1em">Xin chào ${user.email},</p>
        <p>Cảm ơn quý khách đã đặt hàng với chúng tôi. Dưới đây là chi tiết đơn hàng của bạn:</p>
        <ul>
          ${dataItems
            .map(
              (item) =>
                `<li>${item.name} - Số lượng: ${item.quantity} - Giá: ${item.price}</li>`
            )
            .join("")}
        </ul>
        <p style="font-size:0.9em;">Trân trọng,<br />Nguyen Tuan Anh</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Nguyen Tuan Anh</p>
            <p>Việt Nam</p>
        </div>
        </div>
      </div>`
    );

    if (emailSent) {
      console.log("Email sent successfully");
    } else {
      console.error("Failed to send email");
    }

    return res
      .status(200)
      .json({ message: "Order saved successfully", success: true });
  } catch (error) {
    if (mongooseSession.inTransaction()) {
      await mongooseSession.abortTransaction();
    }
    mongooseSession.endSession();
    return console.error(
      "Error processing checkout.session.completed event:",
      error
    );
  }
};

// @HANDLE EVENT WHEN PROCESSING A TRANSACTION
export const listenEvent = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRETE
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      await createStripeOrder(session);

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).end();
};


// @GET ALL ORDER BY USER
export const getAllOrdersByUser = async (req, res) => {
  const options = {
    page: req.query.page ? +req.query.page : 1,
    limit: req.query.limit ? +req.query.limit : 10,
    sort: req.query.sort ? req.query.sort : { createdAt: -1 },
    lean: true,
    populate: {
      path: 'items.productId',
      model: 'ProductItem'
    }
  };

  const filter = {
    userId: req.user._id,
  };

  if (req.query.search) {
    const search = req.query.search;
    filter.$or = [
      { "customerInfo.name": { $regex: new RegExp(search, "i") } },
      { code: { $regex: new RegExp(search, "i") } },
    ];
  }

  if (req.query.paymentMethod) {
    filter.paymentMethod = req.query.paymentMethod;
  }

  if (req.query.isPaid) {
    filter.isPaid = req.query.isPaid;
  }

  if (req.query.orderStatus) {
    filter.orderStatus = req.query.orderStatus;
  }

  try {
    const orders = await Order.paginate(filter, {
      ...options,
    });

    return res.status(200).json({
      message: "OK",
      success: true,
      metadata: orders,
    });
  } catch (error) {
    console.log("Something went wrong.", error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
      error: error.message,
    });
  }
};

// @GET ORDER DETAIL
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate({
        path: 'items.productId',
        model: 'ProductItem'
      })
      .lean();

    if (!order) {
      throw new Error(`Not found any order with id: ${req.params.orderId} `);
    }

    return res
      .status(200)
      .json({ message: "OK", success: true, metadata: order });
  } catch (error) {
    console.log("Something went wrong.", error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
      error: error.message,
    });
  }
};

// @PATCH CANCEL AN  ORDER
// export const cancelOrder = async (req, res) => {
//   try {
//     const foundedOrder = await Order.findById(req.body.orderId);
//     if (!foundedOrder) {
//       throw new Error(`NOt found any order with id ${req.body.orderId}`);
//     }

//     if (req.user.role === ROLES.ADMIN) {
//       foundedOrder.cancelledBy = ROLES.ADMIN;
//     }

//     if (req.body.content) {
//       foundedOrder.cancelledReason = req.body.content;
//     }

//     foundedOrder.orderStatus = ORDER_STATUS.CANCELLED;
//     foundedOrder.canceledReason = req.body.content;
//     await foundedOrder.save();
//     return res.status(200).json({ message: "Cancelled", success: true });
//   } catch (error) {
//     return console.log("Something went wrong.", error);
//   }
// };

export const cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const foundedOrder = await Order.findById(req.body.orderId).session(
      session
    );
    if (!foundedOrder) {
      return res.status(404).json({
        message: `Order not found with id ${req.body.orderId}`,
        success: false,
      });
    }

    if (req.user.role === ROLES.ADMIN) {
      foundedOrder.cancelledBy = ROLES.ADMIN;
    }

    if (req.body.content) {
      foundedOrder.cancelledReason = req.body.content;
    }

    if (foundedOrder.orderStatus === ORDER_STATUS.CANCELLED) {
      throw new Error("This order is already cancelled.");
    }

    // Loop through the products in the order and increase the stock
    for (const item of foundedOrder.items) {
      const product = await ProductItem.findById(item.productId).session(
        session
      );

      if (!product) {
        throw new Error("Product not found");
      }

      product.stock += item.quantity;
      await product.save({ session });
    }

    foundedOrder.orderStatus = ORDER_STATUS.CANCELLED;
    await foundedOrder.save();

    await session.commitTransaction();
    session.endSession();

    // Sending email after the order is canceled
    const user = await User.findById(foundedOrder.userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const emailSent = sendEmail(
      user.email,
      "Xác nhận hoàn tiền",
      `<div class="font-sans min-w-[1000px] overflow-auto leading-7">
        <div class="mx-auto my-12 w-4/5 p-5 bg-white shadow-lg">
          <div class="border-b border-gray-300 pb-3">
            <a href="#" class="text-xl font-semibold text-blue-800 no-underline">Nguyen Tuan Anh</a>
          </div>
          <p class="text-lg mt-5">Xin chào ${user.name || "quý khách"},</p>
          <p class="mt-2">Đơn hàng của bạn đã được hủy thành công. Chúng tôi sẽ tiến hành hoàn tiền trong thời gian sớm nhất.</p>
          <p><strong>Lý do hủy đơn:</strong> ${
            foundedOrder.cancelledReason || "Không có lý do cụ thể"
          }</p>
          <p class="text-base mt-5">Trân trọng,<br />Nguyen Tuan Anh</p>
          <hr class="mt-6 border-t border-gray-200" />
          <div class="text-right text-sm text-gray-500 mt-4">
            <p>Nguyen Tuan Anh</p>
            <p>Việt Nam</p>
          </div>
        </div>
      </div>`
    );

    if (emailSent) {
      console.log("Cancellation email sent successfully");
    } else {
      console.error("Failed to send cancellation email");
    }

    return res
      .status(200)
      .json({ message: "Order cancelled and email sent", success: true });
  } catch (error) {
    console.log("Something went wrong.", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

/**
 * ADMIN
 */

// @GET ALL ORDER BY ADMIN
export const getAllOrders = async (req, res) => {
  const options = {
    page: req.query.page ? +req.query.page : 1,
    limit: req.query.limit ? +req.query.limit : 10,
    sort: req.query.sort ? req.query.sort : { createdAt: -1 },
    lean: true,
  };

  const filter = {};

  if (req.query.search) {
    const search = req.query.search;
    filter.$or = [
      { "customerInfo.name": { $regex: new RegExp(search, "i") } },
      { code: { $regex: new RegExp(search, "i") } },
    ];
  }

  if (req.query.paymentMethod) {
    filter.paymentMethod = req.query.paymentMethod;
  }

  if (req.query.isPaid) {
    filter.isPaid = req.query.isPaid;
  }

  if (req.query.orderStatus) {
    filter.orderStatus = req.query.orderStatus;
  }

  try {
    const orders = await Order.paginate(filter, {
      ...options,
    });

    return res.status(200).json({
      message: "OK",
      success: true,
      metadata: orders,
    });
  } catch (error) {
    console.log("Something went wrong.", error);
    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
      error: error.message,
    });
  }
};

// @PATCH CONFIRM AN ORDER BY ADMIN
export const confirmedOrder = async (req, res) => {
  console.log(req.userId);
  try {
    const foundedOrder = await Order.findById(req.body.orderId);

    if (!foundedOrder) {
      throw new Error(`NOt found any order with id ${req.body.orderId}`);
    }

    foundedOrder.orderStatus = ORDER_STATUS.CONFIRMED;
    foundedOrder.save();

    return res.status(200).json({
      message: "This order is confirmed.",
      success: true,
    });
  } catch (error) {
    return console.log("Something went wrong.", error);
  }
};

// @PATCH SHIPPING AN ORDER BY ADMIN
export const shippingOrder = async (req, res) => {
  try {
    const foundedOrder = await Order.findById(req.body.orderId);
    if (!foundedOrder) {
      throw new Error(`Not found any order with id ${req.body.orderId}`);
    }

    if (foundedOrder.orderStatus !== ORDER_STATUS.CONFIRMED) {
      throw new Error(
        "This order is shipping status when it is confirmed by admin."
      );
    }

    foundedOrder.orderStatus = ORDER_STATUS.SHIPPING;
    await foundedOrder.save();

    return res.status(200).json({
      message: "This order is on delivery.",
      success: true,
    });
  } catch (error) {
    return console.log("Something went wrong.", error);
  }
};

// @PATCH DELIVERED AN ORDER BY ADMIN

export const deliveredOrder = async (req, res) => {
  try {
    const foundedOrder = await Order.findById(req.body.orderId);
    if (!foundedOrder) {
      throw new Error(`NOt found any order with id ${req.body.orderId}`);
    }

    if (foundedOrder.orderStatus !== ORDER_STATUS.SHIPPING) {
      throw new Error(
        "This order is delivered status if it is the previous shipping status."
      );
    }
    foundedOrder.orderStatus = ORDER_STATUS.DELIVERED;
    await foundedOrder.save();

    return res.status(200).json({
      message: "This order is delivered.",
      success: true,
    });
  } catch (error) {
    return console.log("Something went wrong.", error);
  }
};

// @PATCH FINISH AN ORDER
export const finishAnOrder = async (req, res) => {
  try {
    const foundedOrder = await Order.findById(req.body.orderId);
    if (!foundedOrder) {
      throw new Error(`NOt found any order with id ${req.body.orderId}`);
    }

    if (foundedOrder.orderStatus !== ORDER_STATUS.DELIVERED) {
      throw new Error(
        "This order is done when it is delivered or customer received."
      );
    }

    foundedOrder.orderStatus = ORDER_STATUS.DONE;
    await foundedOrder.save();

    return res.status(200).json({
      message: "User received.",
      success: true,
    });
  } catch (error) {
    return console.log("Something went wrong.", error);
  }
};

/**
 * ADMIN
 */

// @GET report ORDER BY ADMIN
export const getReportOrders = async (req, res) => {
  var date = new Date();
  const limit = req.query.limit ? +req.query.limit : 10;
  const sortDemention = req.query.sort ? +req.query.sort : -1;
  const startDate = req.query.startDate
    ? new Date(req.query.startDate)
    : new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = req.query.endDate
    ? new Date(req.query.endDate)
    : new Date(date.getFullYear(), date.getMonth() + 1, 0);

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      { $unwind: "$items" }, // Deconstruct the items array
      {
        $group: {
          _id: "$items.productId",
          totalQuantity: { $sum: "$items.quantity" },
          productName: { $first: "$items.name" },
          productPrice: { $first: "$items.price" },
          productImage: { $first: "$items.image" },
        },
      },

      { $sort: { totalQuantity: sortDemention } }, // Sort by totalQuantity in descending order
      { $limit: limit }, // Limit to top N products
    ]);

    return res.status(200).json({
      message: "OK",
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};
