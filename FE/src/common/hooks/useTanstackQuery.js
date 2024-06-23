import { useNavigate } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosGet, axiosPost, axiosPut } from "../../config/axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
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

export const useTanstackQuery = (path, query = {}) => {
    const { data, ...rest } = useQuery({
        queryKey: [path],
        queryFn: async () => {
            try {
                const response = await axiosGet(addparamstoUrl(path, query));
                return response.data;
            } catch (error) {
                console.warn(error.message);
                throw error;
            }
        },
    });
    return { data, ...rest };
};

export const useTanstackMutation = (path, action, navigatePage) => {
    const queryClient = useQueryClient()
    const form = useForm()
    const navigate = useNavigate()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data) => {
            if (action === "CREATE") {
                return await axiosPost(path, data)
            } else if (action === "UPDATE") {
                return await axiosPut(`${path}/${data._id}`, data)
            } else if (action === "DELETE") {
                return await axiosDelete(`${path}/${data._id}`)
            }
            return null
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [path],
            })
            toast.success(data.message)
            if (navigatePage) {
                navigate(navigatePage)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = (data) => {
        mutate(data)
    }
    return { mutate, form, onSubmit, ...rest }
}