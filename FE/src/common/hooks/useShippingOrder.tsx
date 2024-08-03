import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosCustom from "../../config/axios";

const useShippingOrder = (orderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) =>
      axiosCustom({
        method: "PATCH",
        url: "http://localhost:8000/api/orders/shipping",
        data: { orderId },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
export default useShippingOrder;
