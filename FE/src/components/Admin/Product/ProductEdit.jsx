import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductEdit = () => {
  const{id} = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
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
 useQuery({
    queryKey:["PRODUCT_DETAIL",id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      reset (data);
      return data;
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      const { data } = await axios.put(
        `http://localhost:3000/products/${product.id}`,
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
      <a href="/admin/product">Quay lại</a>
      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Tên Sản Phẩm</label>
                <input {...register("name", { required: true })} type="text" />

                {errors.name && <span>không được để trống</span>}
              </div>

              <div>
                <label>Giá Sản Phẩm</label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                />
                {errors.price && <span>Không được để trống</span>}
              </div>
              <div>
                <label>Ảnh Sản Phẩm</label>
                <input {...register("image", { required: true })} type="text" />
                {errors.image && <span>Không được để trống</span>}
              </div>

              <div>
                <label>Số Lượng </label>
                <input {...register("stock", { required: true })} />
                {errors.stock && <span>Không được để trống</span>}
              </div>

              <div>
                <label>Mô tả Sản Phẩm</label>
                <input {...register("description", { required: true })} />
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
