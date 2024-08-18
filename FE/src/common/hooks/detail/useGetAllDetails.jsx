import { useQuery } from "@tanstack/react-query";
import request from "../../../config/axios";
import { HTTP_METHOD } from "../../../constants/http";
import { QUERY_KEY } from "../../../constants/queryKey";
import { ENDPOINT } from "../../../constants/endpoint";

export const useGetAllDetails = () =>
  useQuery({
    queryKey: [QUERY_KEY.DETAILS],
    queryFn: async () => {
      const response = await request({
        method: HTTP_METHOD.GET,
        url: ENDPOINT.GET_ALL_DETAILS,
      });

      return response.data;
    },
  });
