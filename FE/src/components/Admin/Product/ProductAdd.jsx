import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
const productChema = Joi.object({
  name: Joi.string().required().min(3),
  price: Joi.number().required().min(0).positive(),
  image: Joi.string(),
  description: Joi.string(),
  stock:Joi.number()
});
const ProductAdd = () => {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(productChema),
    defaultValues: {
      name: "",
      price: "",
      image: "",
      description: "",
      stock: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      const { data } = await axios.post(
        `http://localhost:3000/products`,
        product
      );
      return data;
    },
    onSuccess: () => {
     
      toast.success("Sản phẩm đã được thêm thành công!");
      navigate("/admin/product");
    },
    onError: () => {
     
      toast.error("Sản phẩm không được thêm");
      navigate("/admin/product");
    },
  });
  const onSubmit = (data) => { 

    mutate(data);
  };
  return (
    <>
      <div>ProductAdd</div>
      <div className="flex justify-end">
        <a href="/admin/product">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Quay Lại
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
                  {...register("name", { required: true, minLength: 3 })}
                  type="text"
                />

                {errors?.name && <span>{errors?.name?.message}</span>}
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
                    {errors?.price && <span>{errors?.price?.message}</span>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ảnh Sản Phẩm
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("image")}
                  type="text"
                />
                    {errors?.image && <span>{errors?.image?.message}</span>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Số Lượng
                </label>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("stock", { required: true })}
                />
                    {errors?.stock && <span>{errors?.stock?.message}</span>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mô tả Sản Phẩm
                </label>
                <textarea
                  cols="30"
                  rows="10"
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("description")}
                ></textarea>
              </div>

              <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isPending ? "Đang thêm...":" Thêm"}
            </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdd;
