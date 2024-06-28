import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State để quản lý việc hiển thị mật khẩu hiện tại
  const [showNewPassword, setShowNewPassword] = useState(false); // State để quản lý việc hiển thị mật khẩu mới
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State để quản lý việc hiển thị mật khẩu xác nhận
  const userId = localStorage.getItem("userId");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}/change-password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.data.success) {
        toast.success("Đổi mật khẩu thành công");
      } else {
        toast.error("Đổi mật khẩu thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  // Hàm xử lý toggle hiển thị mật khẩu hiện tại
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  // Hàm xử lý toggle hiển thị mật khẩu mới
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  // Hàm xử lý toggle hiển thị mật khẩu xác nhận
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="change-password-container max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Đổi Mật Khẩu</h1>
        <div className="flex flex-col space-y-4">
          {/* Input mật khẩu hiện tại */}
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input p-2 pr-14 bg-white border-black text-black"
            />
            <button
              type="button"
              onClick={toggleCurrentPasswordVisibility}
              className="absolute mx-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 hover:underline focus:outline-none"
            >
              {showCurrentPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          {/* Input mật khẩu mới */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input p-2 pr-14 bg-white border-black text-black"
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute mx-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 hover:underline focus:outline-none"
            >
              {showNewPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          {/* Input xác nhận mật khẩu mới */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input p-2 pr-14 bg-white border-black text-black"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute mx-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 hover:underline focus:outline-none"
            >
              {showConfirmPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          <button
            onClick={handleChangePassword}
            className="btn bg-blue-500 text-white  py-2 rounded"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
