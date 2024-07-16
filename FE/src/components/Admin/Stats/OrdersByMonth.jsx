import { Column } from "@ant-design/plots";

const OrdersByMonth = ({ orderStats }) => {
  const config = {
    data: orderStats,
    xField: "month",
    yField: "values",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
    },
  };
  return <Column {...config} />;
};

export default OrdersByMonth;
