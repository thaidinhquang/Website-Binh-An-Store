import { useQuery } from "@tanstack/react-query";
import request from "../../../config/axios";
import { HTTP_METHOD } from "../../../constants/http";
import { QUERY_KEY } from "../../../constants/queryKey";
import { ENDPOINT } from "../../../constants/endpoint";

export const useGetDetail = (detailId) =>
  useQuery({
    queryKey: [QUERY_KEY.DETAIL, detailId],
    queryFn: async () => {
      const response = await request({
        method: HTTP_METHOD.GET,
        url: `${ENDPOINT.GET_ALL_DETAILS}/${detailId}`,
      });

      return response.data;
    },
  });
