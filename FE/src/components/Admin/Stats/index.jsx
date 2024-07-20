import useOrdersStatistics from "../../../common/hooks/useOrdersStatistics";
import useTotalStatistics from "../../../common/hooks/useTotalStatistics";
import OrdersByDayChart from "./OrdersByDayChart";
import OrdersByMonth from "./OrdersByMonth";
import TotalStatistics from "./TotalStatistics";

const Statistics = () => {
  const { data: statsData } = useTotalStatistics();
  const { data: orderStats } = useOrdersStatistics();

  const stats = statsData?.data && statsData?.data?.metadata;

  return (
    <div className="w-full h-ful">
      <TotalStatistics stats={stats} />
      <div className="mt-[5rem]">
        <h2 className="font-semibold my-4">Doanh số theo ngày</h2>
        <OrdersByDayChart stats={stats} />
      </div>
      <div className="mt-[5rem]">
        <h2 className="font-semibold my-4">Thống kê theo tháng</h2>
        <OrdersByMonth orderStats={orderStats} />
      </div>
    </div>
  );
};
export default Statistics;