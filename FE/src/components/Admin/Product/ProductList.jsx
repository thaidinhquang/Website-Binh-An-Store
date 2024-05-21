import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
const ProductList = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["PRODUCT"], //từ khóa truy vấn để xác định loại dự liệu cần lấy
    queryFn: async () => {
      //Hàm queryFn thực hiện yêu cầu GET để lấy dữ liệu từ URL cụ thể
      const { data } = await axios.get(`http://localhost:3000/products`);
      return data;
    },
  });

  // Sử dụng hook useMutation để thực hiện mutation
  const { mutate } = useMutation({
    // mutationFn là hàm bất đồng bộ thực hiện việc xóa sản phẩm
    mutationFn: async (id) => {
      // Hiển thị hộp thoại xác nhận từ người dùng bằng cửa sổ confirm
      const isConfirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này không?"
      );
      if (isConfirmed) {
        // Nếu người dùng xác nhận, gửi yêu cầu DELETE đến URL cụ thể bằng Axios
        await axios.delete(`http://localhost:3000/products/${id}`);
        // Hiển thị toast thông báo thành công
        toast.success("Sản phẩm đã được xóa thành công");
      } else {
        // Nếu người dùng hủy, hiển thị toast thông báo hủy bỏ và ném một lỗi để ngăn việc gọi onSuccess
        toast.info("Hủy bỏ việc xóa sản phẩm");
        throw new Error("Deletion cancelled");
      }
    },
    // Hành động được thực hiện khi mutation thành công
    onSuccess: () => {
      // Vô hiệu hóa truy vấn cụ thể trong cache để cập nhật lại dữ liệu
      queryClient.invalidateQueries({
        queryKey: ["PRODUCT"],
      });
    },
    // Hành động được thực hiện khi có lỗi trong quá trình mutation
    onError: (error) => {
      // Kiểm tra nếu lỗi không phải do việc hủy bỏ, hiển thị toast thông báo lỗi
      if (error.message !== "Deletion cancelled") {
        // Vô hiệu hóa truy vấn cụ thể trong cache và hiển thị toast thông báo lỗi
        queryClient.invalidateQueries({
          queryKey: ["PRODUCT"],
        });
        toast.error("Không thể xóa sản phẩm");
      }
    },
  });
  return (
    <>
      <div>ProductList</div>
      <a href="product/add">thêm sản phẩm</a>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Tên Sản Phẩm</td>
            <td>Giá Sản Phẩm</td>
            <td>Ảnh Sản Phẩm</td>
            <td>Số Lượng</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((product, index) => (
            <tr key={product.id}>
              <th>{index + 1}</th>
              <th>{product.name}</th>
              <th>{product.price}</th>
              <th>
                <img src={product.image} alt="" />
              </th>
              <th>{product.stock}</th>
              <th>
                <button onClick={() => mutate(product.id)}>delete</button>
                <a href={`/admin/product/edit/${product.id}`}>edit</a>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
