import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosCustom from "../../config/axios.js";

export const useFinishOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId) =>
      await axiosCustom.patch(`http://localhost:8000/api/orders/done`, {
        orderId: orderId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
