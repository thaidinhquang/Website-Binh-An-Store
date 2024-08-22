import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// @Get total statistics
export const commonStatistics = async (req, res) => {
  try {
    // Get the current year and month or use query parameters
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // Define the start and end dates for the query
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Aggregate order statistics by day
    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
          status: { $ne: "cancelled" },
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
      message: "Statistics retrieved successfully.",
      metadata: { totalOrders, totalProducts, totalUsers, stats },
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving statistics." });
  }
};

// @Get orders statistics by month
export const orderStatisticsByMonth = async (req, res) => {
  const year = parseInt(req.query.year) || new Date().getFullYear();

  if (!year) {
    return res.status(400).json({ message: "Year is required." });
  }

  try {
    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
          status: { $ne: "cancelled" },
        },
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

    return res.status(200).json({
      success: true,
      message: "Monthly statistics retrieved successfully.",
      metadata: { stats },
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      message: "An error occurred while retrieving monthly statistics.",
    });
  }
};

// @Get orders statistics by year
export const ordersStatisticsByYear = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $match: {
          status: { $ne: "cancelled" },
        },
      },
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

    return res.status(200).json({
      success: true,
      message: "Yearly statistics retrieved successfully.",
      metadata: { stats },
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      message: "An error occurred while retrieving yearly statistics.",
    });
  }
};
