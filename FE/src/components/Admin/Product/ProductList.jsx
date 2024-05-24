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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <td scope="col" className="px-6 py-3"></td>
            <td scope="col" className="px-6 py-3">Ảnh Sản Phẩm</td>
            <td scope="col" className="px-6 py-3" >Tên Sản Phẩm</td>
            <td scope="col" className="px-6 py-3">Giá Sản Phẩm</td>
            <td scope="col" className="px-6 py-3">Số Lượng</td>
            <td scope="col" className="px-6 py-3">action</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((product, index) => (
            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th className="px-6 py-4">{index + 1}</th>
              <th className="px-6 py-4">
              <img src={product.image} width={100} className=" rounded-lg" alt="" />
            </th>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</th>
              <th className="px-6 py-4">{product.price}</th>
             
              <th className="px-6 py-4">{product.stock}</th>
              <th className="px-6 py-4">
                <button onClick={() => mutate(product.id)}>delete</button>
                <a href={`/admin/product/edit/${product.id}`}>edit</a>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default ProductList;
