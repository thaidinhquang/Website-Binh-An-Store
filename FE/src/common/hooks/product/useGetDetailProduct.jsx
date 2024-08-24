
import { useQuery } from "@tanstack/react-query";
import request from "../../../config/axios";
import { HTTP_METHOD } from "../../../constants/http";
import { QUERY_KEY } from "../../../constants/queryKey";


export const useGetDetailProduct = (detailId) =>
  useQuery({
    queryKey: [QUERY_KEY.DETAIL, detailId],
    queryFn: async () => {
      const response = await request({
        method: HTTP_METHOD.GET,
        url: `http://localhost:8000/api/products/${detailId}`,
      });

      return response.data;
    },
  });