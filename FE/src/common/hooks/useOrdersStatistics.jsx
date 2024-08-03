import { useQuery } from "@tanstack/react-query";
import axiosCustom from "../../config/axios";

const useOrdersStatistics = () => {
  const ORDERS_BY_MONTH = "orders_by_month";

  return useQuery({
    queryKey: [ORDERS_BY_MONTH],
    queryFn: async () =>
      await axiosCustom.get(`http://localhost:8000/api/stats/orders-by-month`),
    select: (data) => {
      const result =
        data?.data?.metadata &&
        data?.data?.metadata?.stats?.flatMap((item) => {
          return [
            { name: "Orders", month: item.month, values: item.totalOrders },
            { name: "Revenue", month: item.month, values: item.totalAmount },
          ];
        });

      return result;
    },
    staleTime: 0,
  });
};
export default useOrdersStatistics;
