import { useQuery } from "@tanstack/react-query";
import axiosCustom from "../../config/axios";

export const useTopUsers = () => {
    const TOP_USERS = "top_users";

    return useQuery({
        queryKey: [TOP_USERS],
        queryFn: async () => {
            try {
                const response = await axiosCustom.get(`http://localhost:8000/api/stats/top-users`);
                return response.data.metadata.result || []; // Đảm bảo trả về mảng trống nếu không có dữ liệu
            } catch (error) {
                // console.error("Error fetching top users:", error);
                // throw new Error("Unable to fetch top users");
            }
        },
        staleTime: 0,
        cacheTime: 300000, // Optional: Set cache time to avoid refetching frequently
    });
};

export default useTopUsers;
