import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../config/axios";
import { toast } from "react-toastify";


const ReviewList = () => {


  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["REVIEWS"],
    queryFn: async () => {
      const response = await instance.get(`/reviews`);
      return response.data.reviews; 
    },
  });
   
   console.log(data)
   
   const { mutate } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await instance.delete(`/reviews/${data.reviews._id}`);
      console.log(response)
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["REVIEWS"]
      });
      toast.success("Phần Đánh giá đã được xóa thành công!");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi xóa đánh giá.");
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Có lỗi xảy ra khi tải dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold mb-4 md:mb-0">Danh sách Đánh giá</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    STT
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Mã User
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Tên User 
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Comment
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Rating
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? data.map((review, index) => (
                  <tr key={review._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{review.user}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{review.name || "Chưa có tên User"  }</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{review.comment}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{review.rating}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => mutate(review._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Không có dữ liệu</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
