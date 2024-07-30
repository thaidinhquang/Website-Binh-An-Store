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
    <div className="w-full h-full bg-gray-100 p-6"> {/* Added bg-gray-100 and p-6 */}
      {/* Total Statistics Section */}
      <TotalStatistics stats={stats} />
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md"> {/* Added p-6, rounded-lg, and shadow-md */}
        <h2 className="text-xl font-semibold mb-4">Doanh số theo ngày</h2>
        <OrdersByDayChart stats={stats} />
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md"> {/* Added p-6, rounded-lg, and shadow-md */}
        <h2 className="text-xl font-semibold mb-4">Thống kê theo tháng</h2>
        <OrdersByMonth orderStats={orderStats} />
      </div>
    </div>
  );
};
export default Statistics;
