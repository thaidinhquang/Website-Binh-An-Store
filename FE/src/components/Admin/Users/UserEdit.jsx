import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const userSchema = Joi.object({
  id:Joi.string(),
  userName: Joi.string().required().min(6),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .min(3),
  address: Joi.string().required().min(0),
  phone: Joi.string().pattern(/^\d+$/).required().min(10),
  role: Joi.string(),
});
const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(userSchema),
    defaultValues: {
      userName: "",
      email: "",
      address: "",
      phone: "",
      role: "",
    },
  });

  useQuery({
    queryKey: ["Users_detail", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      reset(data);
      return data;
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (user) => {
      const { data } = await axios.put(
        `http://localhost:3000/users/${user.id}`,
        user
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được sửa thành công!");
      navigate("/admin/users");
    },
    onError: () => {
      toast.error("Sản phẩm không được sửa");
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data); // 
    mutate(data);
  };

  return (
    <>
      <div className="text-lg font-bold mb-4">Sửa thông tin tài khoản</div>
      <div className="flex justify-end mb-4">
        <Link to="/admin/users">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay lại
          </button>
        </Link>
      </div>

      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên đăng nhập
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("userName")}
              type="text"
            />
            {errors?.userName && (
              <span className="text-red-500 text-sm">
                {errors?.userName?.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("email", { required: true })}
              type="email"
            />
            {errors?.email && (
              <span className="text-red-500 text-sm">
                {errors?.email?.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Số điện thoại
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("phone", { required: true, minLength: 10 })}
              type="text"
            />
            {errors?.phone && (
              <span className="text-red-500 text-sm">
                {errors?.phone?.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Địa chỉ
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("address")}
              type="text"
            />
            {errors?.address && (
              <span className="text-red-500 text-sm">
                {errors?.address?.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Vai trò
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("role", { required: true })}
              type="text"
            />
            {errors?.role && (
              <span className="text-red-500 text-sm">
                {errors?.role?.message}
              </span>
            )}
          </div>

          <button
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900"
            type="submit"
          >
            {isLoading ? "Đang Sửa..." : "Sửa"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UserEdit;
