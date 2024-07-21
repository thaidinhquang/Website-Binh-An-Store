import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// @Get total statistics
export const commonStatistics = async (req, res) => {
  try {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    if (req.query.year) {
      year = req.query.year;
    }

    if (req.query.month) {
      month = req.query.month;
    }

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
          totalOrders: 1,
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Statistics",
      metadata: { totalOrders, totalProducts, totalUsers, stats },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something wen wrong..." });
  }
};

// @Get  orders statistics by months
export const orderStatisticsByMonth = async (req, res) => {
  let year = new Date().getFullYear();

  if (req.query.year) {
    year = req.query.year;
  }

  if (!year) {
    return res.status(400).json({ message: "Year is required" });
  }

  let matchCondition = {
    createdAt: {
      $gte: new Date(`${year}-01-01`),
      $lt: new Date(`${year}-12-31`),
    },
  };

  try {
    const stats = await Order.aggregate([
      {
        $match: matchCondition,
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          totalOrders: 1,
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);

    res
      .status(200)
      .json({ message: "Statistics", status: true, metadata: { stats } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//@Get orders statistics by year
export const ordersStatisticsByYear = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1 },
      },
      {
        $project: {
          year: "$_id.year",
          totalOrders: 1,
          _id: 0,
        },
      },
    ]);

    return res
      .status(200)
      .json({ message: "Statistics", status: true, metadata: { stats } });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};




// @Get top-selling products
export const getTopSellingProducts = async (req, res) => {
  try {
    const topSellingProducts = await Order.aggregate([
      {
        $unwind: "$items" // Tách các mục trong đơn hàng
      },
      {
        $group: {
          _id: "$items.productId",
          totalOrders: { $sum: 1 }
        }
      },
      {
        $sort: { totalOrders: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const productIds = topSellingProducts.map(p => p._id);
    const products = await Product.find({ _id: { $in: productIds } });

    const result = topSellingProducts.map(order => ({
      product: products.find(p => p._id.toString() === order._id.toString()),
      totalOrders: order.totalOrders
    }));

    res.status(200).json({ success: true, metadata: { topSellingProducts: result } });
  } catch (error) {
    console.error("Error fetching top-selling products:", error);
    res.status(500).json({ message: "Error fetching top-selling products", error: error.message });
  }
};

// @Get least-selling products
export const getLeastSellingProducts = async (req, res) => {
  try {
    const leastSellingProducts = await Order.aggregate([
      {
        $unwind: "$items" // Tách các mục trong đơn hàng
      },
      {
        $group: {
          _id: "$items.productId",
          totalOrders: { $sum: 1 }
        }
      },
      {
        $sort: { totalOrders: 1 }
      },
      {
        $limit: 10
      }
    ]);

    const productIds = leastSellingProducts.map(p => p._id);
    const products = await Product.find({ _id: { $in: productIds } });

    const result = leastSellingProducts.map(order => ({
      product: products.find(p => p._id.toString() === order._id.toString()),
      totalOrders: order.totalOrders
    }));

    res.status(200).json({ success: true, metadata: { leastSellingProducts: result } });
  } catch (error) {
    console.error("Error fetching least-selling products:", error);
    res.status(500).json({ message: "Error fetching least-selling products", error: error.message });
  }
};

// @Get top customers
export const getTopCustomers = async (req, res) => {
  try {
    // Tìm các khách hàng với số lượng đơn hàng nhiều nhất
    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalOrders: { $sum: 1 }
        }
      },
      {
        $sort: { totalOrders: -1 }
      },
      {
        $limit: 10
      }
    ]);

    // Lấy thông tin người dùng từ danh sách các userId
    const userIds = topCustomers.map(customer => customer._id);
    const users = await User.find({ _id: { $in: userIds } });

    // Kết hợp thông tin người dùng với số lượng đơn hàng
    const result = topCustomers.map(customer => ({
      user: users.find(user => user._id.toString() === customer._id.toString()),
      totalOrders: customer.totalOrders
    }));

    res.status(200).json({ success: true, metadata: { result } });
  } catch (error) {
    console.error("Error fetching top customers:", error);
    res.status(500).json({ message: "Error fetching top customers", error: error.message });
  }
};




