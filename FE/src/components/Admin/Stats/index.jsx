import useOrdersStatistics from "../../../common/hooks/useOrdersStatistics";
import useTotalStatistics from "../../../common/hooks/useTotalStatistics";
import useTopSellingProducts from "../../../common/hooks/useTopSellingProducts";
import useLeastSellingProducts from "../../../common/hooks/useLeastSellingProducts";
import useTopUsers from "../../../common/hooks/useTopUsers";

import OrdersByDayChart from "./OrdersByDayChart";
import OrdersByMonth from "./OrdersByMonth";
import TotalStatistics from "./TotalStatistics";

const Statistics = () => {
  const { data: statsData, isLoading: statsLoading, error: statsError } = useTotalStatistics();
  const { data: orderStats, isLoading: orderStatsLoading, error: orderStatsError } = useOrdersStatistics();
  const { data: topSellingProducts, isLoading: topSellingLoading, error: topSellingError } = useTopSellingProducts();
  const { data: leastSellingProducts, isLoading: leastSellingLoading, error: leastSellingError } = useLeastSellingProducts();
  const { data: topUsers, isLoading: topUsersLoading, error: topUsersError } = useTopUsers();

  // if (statsLoading || orderStatsLoading || topSellingLoading || leastSellingLoading || topUsersLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (statsError || orderStatsError || topSellingError || leastSellingError || topUsersError) {
  //   return <div>Error loading statistics.</div>;
  // }

  const stats = statsData?.data?.metadata || {};
  const topSellingProductsList = topSellingProducts?.data || [];
  const leastSellingProductsList = leastSellingProducts?.data || [];
  const topUsersList = topUsers?.data || [];

  return (
    <div className="w-full h-full">
      <TotalStatistics stats={stats} />
      <div className="mt-[5rem]">
        <h2 className="font-semibold my-4">Doanh số theo ngày</h2>
        <OrdersByDayChart stats={stats} />
      </div>
      <div className="mt-[5rem]">
        <h2 className="font-semibold my-4">Thống kê theo tháng</h2>
        <OrdersByMonth orderStats={orderStats} />
      </div>

      <div className="mt-[5rem]">
        <h2 className="font-semibold my-4">Top sản phẩm bán chạy nhất</h2>
        <ul>
          {Array.isArray(topSellingProductsList) && topSellingProductsList.length > 0 ? (
            topSellingProductsList?.map(product => (
              <li key={product._id}>{product.name} - {product.sales}</li>
            ))
          ) : (
            <li>Không có dữ liệu</li>
          )}
        </ul>
      </div>
      <div className="mt-[5rem]">
        <h2 className="font-semibold my-4">Top sản phẩm bán được ít nhất</h2>
        <ul>
          {Array.isArray(leastSellingProductsList) && leastSellingProductsList.length > 0 ? (
            leastSellingProductsList?.map(product => (
              <li key={product._id}>{product.name} - {product.sales}</li>
            ))
          ) : (
            <li>Không có dữ liệu</li>
          )}
        </ul>
      </div>
      <div className="mt-[5rem]">
        <h2 className="font-semibold my-4">User mua hàng nhiều nhất</h2>
        <ul>
          {Array.isArray(topUsersList) && topUsersList.length > 0 ? (
            topUsersList?.map(user => (
              <li key={user._id}>{user.name} - {user.totalOrders}</li>
            ))
          ) : (
            <li>Không có dữ liệu</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;