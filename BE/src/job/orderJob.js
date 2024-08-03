import { CronJob } from "cron";
import { ORDER_STATUS } from "../constants/order.js";
import Order from "../models/Order.js";

export const checkDeliveredOrderJob = async () => {
  const orderJob = CronJob.from({
    cronTime: "* * * * *",
    onTick: async () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const orders = await Order.find({
        orderStatus: ORDER_STATUS.DELIVERED,
        createdAt: { $lte: threeDaysAgo },
      }).lean();

      console.log(`Total orders queue: ${orders.length ?? 0}`);
      console.log("Processing orders....");

      if (orders && orders.length) {
        orders.forEach(async (order) => {
          await Order.updateOne(
            { _id: order._id },
            { $set: { orderStatus: ORDER_STATUS.DONE } }
          );
        });
      }
    },
    start: true,
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return orderJob;
};
