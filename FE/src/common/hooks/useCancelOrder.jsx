import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosCustom from "../../config/axios.js";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, description }) => {
      return await axiosCustom.patch(
        `http://localhost:8000/api/orders/cancel`,
        {
          orderId: orderId,
          content: description,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
