import { useNavigate } from "react-router-dom"
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

export const useTanstackQuery = (path, query = {}, returnData = true) => {
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
  });
  return { data, ...rest };
};

export const useTanstackMutation = ({
  path,
  action,
  navigatePage,
  toastMessage,
  invalidateQueries,
}) => {
  const queryClient = useQueryClient();
  const form = useForm();
  const navigate = useNavigate();
  const { mutate: originalMutate, ...rest } = useMutation({
    mutationFn: async (data) => {
      if (action === "CREATE") {
        return await axiosPost(path, data);
      } else if (action === "UPDATE") {
        return await axiosPut(`${path}/${data._id}`, data);
      } else if (action === "PATCH") {
        return await axiosPatch(path, data);
      } else if (action === "DELETE") {
        return data.active ? await axiosDelete(`${path}/${data._id}`) : await axiosDelete(`${path}/restore/${data._id}`);
      } else if (action === "UPLOAD") {
        const url = await uploadFileCloudinary(data)
        console.log(url);
        return url;
      }
      return null;
    },
    onMutate: async (variables) => {
      const toastId = toast.loading(toastMessage || "Processing...");
      const startTime = Date.now(); // Record the start time
      return { toastId, startTime };
    },
    onSuccess: (data, variables, context) => {
      const elapsedTime = Date.now() - context.startTime; // Calculate elapsed time
      const delay = Math.max(500 - elapsedTime, 0); // Calculate remaining delay to ensure at least 1 second
      setTimeout(() => { // Delay the toast update if needed
        toast.update(context.toastId, { render: toastMessage || data.message, type: "success", isLoading: false, autoClose: 5000 });
        if (navigatePage) {
          navigate(navigatePage);
        }
      }, delay);
    },
    onError: (error, variables, context) => {
      const elapsedTime = Date.now() - context.startTime; // Calculate elapsed time
      const delay = Math.max(500 - elapsedTime, 0); // Calculate remaining delay to ensure at least 1 second
      setTimeout(() => { // Delay the toast update if needed
        toast.update(context.toastId, { render: `Error: ${error.message}`, type: "error", isLoading: false, autoClose: 5000 });
      }, delay);
    },
    onSettled: (data, error, variables, context) => {
      if (invalidateQueries != false) {
        queryClient.invalidateQueries(path);
      }
    },
  });

  const mutate = (data, options = {}) => {
    originalMutate(data, {
      ...options,
      onSettled: (data, error, variables, context) => {
        if (options.onSettled) {
          options.onSettled(data, error, variables, context);
        }
      },
    });
  };

  const onSubmit = (data) => {
    mutate(data);
  };

  return { mutate, form, onSubmit, ...rest };
};