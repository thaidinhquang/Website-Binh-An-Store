import { Column } from "@ant-design/plots";

const OrdersByDayChart = ({ stats }) => {
  const data = stats
    ? stats?.stats?.map((item) => ({
        day: item.day,
        amount: item.totalAmount,
      }))
    : [];
  const config = {
    data,
    xField: "day",
    yField: "amount",
    style: {
      fill: () => {
        return "#2989FF";
      },
      maxWidth: 100,
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.amount);
        return `Revenue: ${val}`;
      },
      offset: 10,
    },
    legend: false,
  };
  return <Column {...config} />;
};

export default OrdersByDayChart;