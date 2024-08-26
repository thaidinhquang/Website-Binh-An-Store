import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/core/Auth";

const UserProfile = () => {
  const { currentUser, fetchUser } = useContext(AuthContext);

  // Sử dụng hiệu ứng để lấy dữ liệu người dùng nếu dữ liệu đó chưa được tải
  useEffect(() => {
    if (!currentUser) {
      fetchUser();
    }
  }, [currentUser, fetchUser]);

  return (
    <div className="profile-container max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Thông Tin Của Tôi</h1>
        <div className="flex justify-start gap-8">
          <div>
            <img 
              className="size-60 object-cover" 
              src={currentUser?.avatar || 'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg'} 
              alt={currentUser?.name} 
            />
          </div>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-6">
              <span className="font-semibold text-gray-700">Tên:</span>
              <span className="text-gray-900">{currentUser?.name}</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-900">{currentUser?.email}</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="font-semibold text-gray-700">Địa chỉ:</span>
              <span className="text-gray-900">{currentUser?.address}</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="font-semibold text-gray-700">Số điện thoại:</span>
              <span className="text-gray-900">{currentUser?.phone}</span>
            </div>
            <Link className="btn bg-blue-500 text-white px-4 py-2 rounded" to={`/profile/edit/`}>Chỉnh Sửa</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
