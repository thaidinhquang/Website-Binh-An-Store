import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosDelete, axiosGet, axiosPatch, axiosPost, axiosPut } from "../../config/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { uploadFileCloudinary } from "../libs/uploadImageCloud";
export const addparamstoUrl = (url, params) => {
  let newUrl = url;
  if (params) {
    newUrl += "?";
    for (const key in params) {
      newUrl += `${key}=${params[key]}&`;
    }
    newUrl = newUrl.slice(0, -1);
  }
  return newUrl;
};

export const useTanstackQuery = (path, query = {}, returnData = true, enable = true) => {
  const { data, ...rest } = useQuery({
    queryKey: [path],
    queryFn: async () => {
      try {
        const response = await axiosGet(addparamstoUrl(path, query));
        return returnData ? response.data : response;
      } catch (error) {
        console.warn(error.message);
        throw error;
      }
    },
    enabled: enable, // Add the enabled option here
  });
  return { data, ...rest };
};

export const useTanstackMutation = ({
  path,
  action,
  navigatePage,
  invalidateQueries,
  toastMessage,
}) => {
  const queryClient = useQueryClient();
  const form = useForm();
  const navigate = useNavigate();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data) => {
      let toastId = toast.loading('Processing...');
      try {
        let result;
        if (action === "CREATE") {
          result = await axiosPost(path, data);
        } else if (action === "UPDATE") {
          result = await axiosPut(`${path}/${data._id}`, data);
        } else if (action === "PATCH") {
          result = await axiosPatch(path, data);
        } else if (action === "DELETE") {
          result = data.active ? await axiosDelete(`${path}/${data._id}`) : await axiosDelete(`${path}/restore/${data._id}`);
        } else if (action === "UPLOAD") {
          const url = await uploadFileCloudinary(data);
          result = { message: 'File uploaded successfully!', url };
        } else {
          result = { message: 'Unknown action' };
        }
        toast.update(toastId, { render: result.message, type: 'success', isLoading: false, autoClose: 5000 });
        return result;
      } catch (error) {
        toast.update(toastId, { render: error.message, type: 'error', isLoading: false, autoClose: 5000 });
        throw error;
      }
    },
    onSuccess: (data) => {
      if (invalidateQueries != false) {
        queryClient.invalidateQueries(path);
      }
      if (navigatePage) {
        navigate(navigatePage);
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return { mutate, form, onSubmit, ...rest };
};