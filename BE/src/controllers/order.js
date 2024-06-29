import Stripe from "stripe";
import Order from "../models/Order.js";
import { ORDER_STATUS } from "../constants/order.js";
import { ROLES } from "../constants/Role.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @POST CHECKOUT SESSION WITH STRIPE
export const checkoutSession = async (req, res) => {
  const lineItems = req.body.items.map((item) => ({
    price_data: {
      currency: req.body.currency,
      product_data: {
        name: item.name,
        images: [item.image ?? ""],
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
  try {
    const order = new Order({
      ...req.body,
      userId: req.userId,
    });

    await order.save();

    return res.status(200).json({
      message: "Created a new order.",
      success: true,
      metadata: null,
    });
  } catch (error) {
    console.log("Something went wrong...", error);
  }
};

// @POST CREATE ORDER BY CARD
export const createStripeOrder = async (session) => {
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
        });
      }
    }

    const dataItems = detailedLineItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.amount_total,
      image: item.image,
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

    console.log("Order saved successfully");
  } catch (error) {
    console.error("Error processing checkout.session.completed event:", error);
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
  };

  const filter = {
    userId: req.user._id,
  };

  if (req.query.search) {
    const search = req.query.search;
    filter._id = { $regex: new RegExp(search, "i") };
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
    const orders = await Order.paginate(filter, options);

    return res.status(200).json({
      message: "OK",
      success: true,
      metadata: orders,
    });
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};

// @GET ORDER DETAIL
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).lean();

    if (!order) {
      throw new Error(`Not found any order with id: ${req.params.orderId} `);
    }

    return res
      .status(200)
      .json({ message: "OK", success: true, metadata: order });
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};

// @PATCH CANCEL AN  ORDER
export const cancelOrder = async (req, res) => {
  try {
    const foundedOrder = await Order.findById(req.body.orderId);
    if (!foundedOrder) {
      throw new Error(`NOt found any order with id ${req.body.orderId}`);
    }

    if (req.user.role === ROLES.ADMIN) {
      foundedOrder.canceledBy = ROLES.ADMIN;
    }

    if (req.body.content) {
      foundedOrder.canceledReason = req.body.content;
    }

    foundedOrder.orderStatus = ORDER_STATUS.CANCELED;
    foundedOrder.save();
    return res.status(200).json({ message: "Canceled", success: true });
  } catch (error) {
    console.log("Something went wrong.", error);
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

  if (req.query.search) {
    const search = req.query.search;
    filter._id = { $regex: new RegExp(search, "i") };
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
    const orders = await Order.paginate(filter, options);

    return res.status(200).json({
      message: "OK",
      success: true,
      metadata: orders,
    });
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};

// @PATCH CONFIRM AN ORDER BY ADMIN
export const confirmedOrder = async (req, res) => {
  try {
    const foundedOrder = await Order.findById(req.body.orderId);
    if (!foundedOrder) {
      throw new Error(`NOt found any order with id ${req.body.orderId}`);
    }

    foundedOrder.orderStatus = ORDER_STATUS.CONFIRMED;

    return res.status(200).json({
      message: "This order is confirmed.",
      success: true,
    });
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};

// @PATCH FINISH AN ORDER BY ADMIN
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
    return res.status(200).json({
      message: "This order is done.",
      success: true,
    });
  } catch (error) {
    console.log("Something went wrong.", error);
  }
};
