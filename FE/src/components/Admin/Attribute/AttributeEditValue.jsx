import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../../../config/axios";
import { toast } from "react-toastify";

const AttributeEditValue = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
  });

  const { data: attributeData } = useQuery({
    queryKey: ["ATTRIBUTE_VALUE_DETAIL", id],
    queryFn: async () => {
      const { data } = await instance.get(`/attributes/${id}/values`);
      reset(data); // Populate form with fetched data
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (attribute) => {
      const { data } = await instance.put(`/attributes/${id}/values`, attribute);
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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="text-lg font-bold mb-4">Sửa giá trị thuộc tính</div>
      <div className="mb-4">
        <span className="text-gray-700">Chỉnh sửa thuộc tính: </span>
        <span className="font-semibold">{attributeData?.name}</span>
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/admin/attribute">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay lại
          </button>
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Giá trị:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("name", { required: 'Không được bỏ trống' })}
              type="text"
            />
            {errors?.name && (
              <span className="text-red-500">{errors?.name?.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Giá :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("price", { required: 'Không được bỏ trống' })}
              type="number"
            />
            {errors?.price && (
              <span className="text-red-500">{errors?.price?.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Số Lượng:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("quantity", { required: 'Không được bỏ trống' })}
              type="number"
            />
            {errors?.quantity && (
              <span className="text-red-500">{errors?.quantity?.message}</span>
            )}
          </div>
          
          <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
            {isPending ? "Đang Sửa..." : "Sửa"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AttributeEditValue