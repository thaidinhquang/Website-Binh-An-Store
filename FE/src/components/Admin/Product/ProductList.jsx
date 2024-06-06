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

  // Sử dụng useMutation để thực hiện mutation
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
      <div>Danh sách sản phẩm</div>
      <div className="my-8">
      <a
        className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        href="category/add"
      >
        thêm sản phẩm
      </a>
    </div>
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
              <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1"><svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
           </svg></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><button className="" onClick={() => mutate(product.id)}>delete</button></li>
                <li> <a href={`/admin/product/edit/${product.id}`}>edit</a></li>
              </ul>
            </div>
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
