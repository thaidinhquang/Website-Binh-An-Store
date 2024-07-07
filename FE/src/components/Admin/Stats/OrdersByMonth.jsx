import { Line } from "@ant-design/charts";

const OrdersByMonth = ({ orderStats }) => {
  console.log(orderStats);
  const data =
    orderStats && orderStats.stats
      ? orderStats.stats.map((item) => ({
          month: item.month,
          amount: item.totalOrders,
        }))
      : [];

  const config = {
    data,
    xField: "month",
    yField: "amount",
    point: {
      shapeField: "circle",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    legend: { size: false },
    style: {
      lineWidth: 2,
    },
    colorField: "blue",
  };
  return <Line {...config} />;
};
export default OrdersByMonth;
