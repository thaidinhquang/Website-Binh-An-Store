import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ComeBack from "../../icons/ComeBack";

const ProductAdd = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      queryClient.invalidateQueries({
        queryKey: ["PRODUCT"],
      });
      toast.success("Sản phẩm đã được thêm thành công!");
      navigate("/admin/product");
    },
    onError:()=>{
      queryClient.invalidateQueries({
        queryKey: ["PRODUCT"],
      });
      toast.error("Sản phẩm không được thêm");
      navigate("/admin/product");
    }
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
      <ComeBack />
    </button>
  </a>
</div>

      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Tên Sản Phẩm</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"            {...register("name", { required: true })} type="text" />

                {errors.name && <span>không được để trống</span>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Giá Sản Phẩm</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                  {...register("price", { required: true })}
                  type="number"
                />
                {errors.price && <span>Không được để trống</span>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Ảnh Sản Phẩm</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  {...register("image", { required: true })} type="text" />
                {errors.image && <span>Không được để trống</span>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Số Lượng </label>
                <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" {...register("stock", { required: true })} />
                {errors.stock && <span>Không được để trống</span>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả Sản Phẩm</label>
                <textarea cols="30" rows="10" className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" {...register("description", { required: true })} ></textarea>
              </div>

              <button>{isPending ? "Đang Thêm..." : "Thêm"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdd;
