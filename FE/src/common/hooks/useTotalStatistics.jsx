import { useQuery } from "@tanstack/react-query";
import axiosCustom from "../../config/axios";

export const useTotalStatistics = () => {
  const TOTAL_STATISTICS = "total_statistics";

  return useQuery({
    queryKey: [TOTAL_STATISTICS],
    queryFn: async () =>
      await axiosCustom.get(`http://localhost:8000/api/stats`),
    staleTime: 0,
  });
};
export default useTotalStatistics;
