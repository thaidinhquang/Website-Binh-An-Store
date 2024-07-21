import { useQuery } from "@tanstack/react-query";
import axiosCustom from "../../config/axios";

export const useLeastSellingProducts = () => {
    const LEAST_SELLING_PRODUCTS = "least_selling_products";

    return useQuery({
        queryKey: [LEAST_SELLING_PRODUCTS],
        queryFn: async () => {
            try {
                const response = await axiosCustom.get(`http://localhost:8000/api/stats/least-selling-products`);
                return response.data.metadata.leastSellingProducts || []; // Đảm bảo trả về mảng trống nếu không có dữ liệu
            } catch (error) {
                console.error("Error fetching least selling products:", error);
                throw new Error("Unable to fetch least selling products");
            }
        },
        staleTime: 0,
    });
};

export default useLeastSellingProducts;
