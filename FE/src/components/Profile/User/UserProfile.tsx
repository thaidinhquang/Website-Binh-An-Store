import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const UserProfile = () => {
  // Giả sử bạn có thể lấy ID người dùng từ localStorage hoặc từ một hook khác
  const userId = localStorage.getItem("userId"); // Ví dụ: Lấy userId từ localStorage

  const { data, error, isLoading } = useQuery({
    queryKey: ["UserProfile", userId], // Sử dụng userId để tạo khóa truy vấn duy nhất
    queryFn: async () => {
      if (!userId) {
        throw new Error("User is not logged in");
      }
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      return response.data;
    },
    enabled: !!userId, // Chỉ chạy truy vấn nếu có userId
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="profile-container max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Thông Tin Của Tôi</h1>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-gray-700">Tên đăng nhập:</span>
            <span className="text-gray-900">{data?.userName}</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900">{data?.email}</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-gray-700">Địa chỉ:</span>
            <span className="text-gray-900">{data?.address}</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-gray-700">Số điện thoại:</span>
            <span className="text-gray-900">{data?.phone}</span>
          </div>
          <Link
            to={`/edit-profile/${data?.id}}`}
            className="btn bg-blue-500 text-white px-4 py-2 rounded"
          >
            Chỉnh sửa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
