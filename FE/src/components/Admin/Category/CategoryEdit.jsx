import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
const categoryChema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required().min(3),
});

const CategorytEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(categoryChema),
    defaultValues: {
      name: "",
    },
  });
  useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/categories/${id}`);
      reset(data);
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      const { data } = await axios.put(
        `http://localhost:3000/categories/${product.id}`,
        product
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CATEGORY"],
      });
      toast.success("Danh mục đã được thêm thành công!");
      navigate("/admin/category");
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["CATEGORY"],
      });
      toast.error("Danh mục không được thêm");
      navigate("/admin/category");
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <>
      <div>Sửa Danh Mục</div>
      <div className="flex justify-end">
        <a href="admin/category">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay lại
          </button>
        </a>
      </div>

      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tên Danh Mục:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("name", { required: true, minLength: 3 })}
                  type="text"
                />

                {errors?.name && <span>{errors?.name?.message}</span>}
              </div>

              <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                {isPending ? "Đang Sửa..." : "Sửa"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorytEdit;
