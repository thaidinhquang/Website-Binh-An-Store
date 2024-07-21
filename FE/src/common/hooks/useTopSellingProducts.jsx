import { useQuery } from "@tanstack/react-query";
import axiosCustom from "../../config/axios";

export const useTopSellingProducts = () => {
    const TOP_SELLING_PRODUCTS = "top_selling_products";

    return useQuery({
        queryKey: [TOP_SELLING_PRODUCTS],
        queryFn: async () => {
            try {
                const response = await axiosCustom.get(`http://localhost:8000/api/stats/top-selling-products`);
                return response.data.metadata.topSellingProducts || []; // Đảm bảo trả về mảng trống nếu không có dữ liệu
            } catch (error) {
                console.error("Error fetching top selling products:", error);
                throw new Error("Unable to fetch top selling products");
            }
        },
        staleTime: 0,
    });
};

export default useTopSellingProducts;