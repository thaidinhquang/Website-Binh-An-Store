import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosCustom from "../../config/axios.js";

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId) => {
      return await axiosCustom.patch(
        `http://localhost:8000/api/orders/confirm`,
        {
          orderId,
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
