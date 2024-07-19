import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../../../config/axios";
import { toast } from "react-toastify";

const AttributeEdit = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
   name:""
  });


  useQuery({
    queryKey: ["ATTRIBUTE_DETAIL", id],
    queryFn: async () => {
      const { data } = await instance.get(`/attributes/${id}`);
      console.log(data)
      reset(data); // Populate form with fetched data
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (attribute) => {
      const { data } = await instance.post(`/attributes`, attribute);
      return data;
    },
    onSuccess: () => {
      toast.success("attribute đã được thêm thành công!");
      navigate("/admin/attribute");
    },
    onError: () => {
      toast.error("Không thể thêm attribute");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div>
    <div className="text-lg font-bold mb-4">Theem thông tin Attribute</div>
    <div className="flex justify-end">
    <Link to="admin/attribute">
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay lại
        </button>
    </Link>
</div>
<div>
<form onSubmit={handleSubmit(onSubmit)}>
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Name Attribute:
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("name", { required: 'Không được bỏ trống' })}
            type="text"
        />
        {errors?.name && (
            <span className="text-red-500">{errors?.name?.message}</span>
          )}
    </div>
   
    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
    {isPending ? "Đang Thêm..." : "Thêm"}
    </button>
</form>
</div>
    </div>
  )
}

export default AttributeEdit