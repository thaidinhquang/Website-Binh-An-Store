import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
const productChema = Joi.object({
  id:Joi.string(),
  name: Joi.string().required().min(3),
  price: Joi.number().required().min(0).positive(),
  image: Joi.string(),
  description: Joi.string(),
  stock:Joi.number()
});

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver:joiResolver(productChema),
    defaultValues: {
      name: "",
      price: "",
      image: "",
      description: "",
      stock: "",
    },
  });
  useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      reset(data);
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      const { data } = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        product
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được sửa thành công!");
      navigate("/admin/product");
    },
    onError: () => {

      toast.error("Sản phẩm không được sửa");
      navigate("/admin/product");
    },
  });
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <>
      <div>Sửa Sản Phẩm</div>
      <div className="flex justify-end">
  <a href="admin/product">
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
                  Tên Sản Phẩm
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("name", { required: true })}
                  type="text"
                />

                {errors.name && <span>không được để trống</span>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Giá Sản Phẩm
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("price", { required: true })}
                  type="number"
                />
                {errors.price && <span>Không được để trống</span>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ảnh Sản Phẩm
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("image", { required: true })}
                  type="text"
                />
                {errors.image && <span>Không được để trống</span>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Số Lượng{" "}
                </label>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("stock", { required: true })}
                />
                {errors.stock && <span>Không được để trống</span>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mô tả Sản Phẩm
                </label>
                <textarea
                  cols="30"
                  rows="10"
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("description", { required: true })}
                ></textarea>
              </div>

              <button>{isPending ? "Đang Sửa..." : "Sửa"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductEdit;
