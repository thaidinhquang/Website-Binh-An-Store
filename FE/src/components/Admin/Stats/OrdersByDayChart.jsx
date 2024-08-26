import { useState } from "react";
import { Column } from "@ant-design/plots";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const OrdersByDayChart = ({ stats }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date ? dayjs(dateString).format("YYYY-MM-DD") : null);
  };

  // Filter and format the data based on the selected date
  const filteredData =
    stats?.stats
      .filter((item) => {
        if (!selectedDate) return true; // Show all data if no date is selected
        const itemDate = dayjs(`${item.year}-${item.month}-${item.day}`).format(
          "YYYY-MM-DD"
        );
        return itemDate === selectedDate;
      })
      ?.map((item) => ({
        day: `${item.year}-${item.month}-${item.day}`,
        amount: item.totalAmount,
      })) || [];

  const config = {
    data: filteredData,
    xField: "day",
    yField: "amount",
    color: "#2989FF",
    label: {
      text: (originData) => {
        const val = parseFloat(originData.amount);
        return `Doanh thu: ${val}`;
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      tickInterval: 1,
    },
  };

  return (
    <div>
      <DatePicker
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        placeholder="Select a date"
      />
      <Column {...config} />
    </div>
  );
};

export default OrdersByDayChart;
