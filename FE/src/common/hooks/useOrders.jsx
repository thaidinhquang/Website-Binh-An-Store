import { useQuery } from "@tanstack/react-query";
import axiosCustom from "../../config/axios.js";

const ORDERS = "orders";

export const useOrders = (params) => {
  return useQuery({
    queryKey: [ORDERS],
    queryFn: async () =>
      await axiosCustom.get(`http://localhost:8000/api/orders`, { params }),
    select: (data) => data?.data?.metadata,
    staleTime: 0,
  });
};
export const useOrders_by_user = (params) => {
  return useQuery({
    queryKey: [ORDERS],
    queryFn: async () =>
      await axiosCustom.get(`http://localhost:8000/api/orders/by_user`, { params }),
    select: (data) => data?.data?.metadata,
    staleTime: 0,
  });
};
