import { useQuery } from "@tanstack/react-query";
import axiosCustom from "../../config/axios.js";

export const useOrderDetail = (orderId) =>
  useQuery({
    queryKey: ["orderDetail"],
    queryFn: async () => {
      const res = await axiosCustom.get(
        `http://localhost:8000/api/orders/${orderId}`
      );
      return res?.data?.metadata;
    },
  });
