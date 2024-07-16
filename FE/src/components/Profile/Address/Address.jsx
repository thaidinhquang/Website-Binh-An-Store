import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Address = () => {
  // Giả sử bạn có thể lấy ID người dùng từ localStorage hoặc từ một hook khác
  const userId = localStorage.getItem("userId"); // Ví dụ: Lấy userId từ localStorage

  const { data, error, isLoading } = useQuery({
    queryKey: ["UserAddress", userId], // Sử dụng userId để tạo khóa truy vấn duy nhất
    queryFn: async () => {
      if (!userId) {
        throw new Error("User is not logged in");
      }
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/address`
      );
      return response.data;
    },
    enabled: !!userId, // Chỉ chạy truy vấn nếu có userId
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="address-container max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Địa Chỉ Của Tôi</h1>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-gray-700">Địa chỉ:</span>
            <span className="text-gray-900">{data?.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;