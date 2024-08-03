import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosCustom from "../../config/axios";

export const useDeliveredOrder = (orderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      axiosCustom({
        method: "PATCH",
        url: "http://localhost:8000/api/orders/delivered",
        data: { orderId },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
