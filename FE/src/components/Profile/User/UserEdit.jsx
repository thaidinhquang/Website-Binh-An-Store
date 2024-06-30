
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UserEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${userId}`, user);
      toast.success("User information updated successfully");
      navigate("/profile"); // Điều hướng về trang thông tin người dùng
    } catch (error) {
      toast.error("Failed to update user information");
    }
  };

  return (
    <div className="edit-profile-container max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">
          CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex items-center space-x-6">
            <label className="font-semibold text-gray-700" htmlFor="userName">
              Tên đăng nhập:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className="text-gray-900"
            />
          </div>
          <div className="flex items-center space-x-6">
            <label className="font-semibold text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="text-gray-900"
            />
          </div>
          <div className="flex items-center space-x-6">
            <label className="font-semibold text-gray-700" htmlFor="address">
              Địa chỉ:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="text-gray-900"
            />
          </div>
          <div className="flex items-center space-x-6">
            <label className="font-semibold text-gray-700" htmlFor="phone">
              Số điện thoại:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
