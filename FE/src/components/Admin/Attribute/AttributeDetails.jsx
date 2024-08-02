import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../config/axios";

const AttributeDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["ATTRIBUTE_DETAIL", id],
    queryFn: async () => {
      const response = await instance(`/attributes/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const attributeValues = Array.isArray(data?.values) ? data.values : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">
      Chi Tiết Thuộc Tính <span>{data?.name}</span>
    </h1>
      
      </div>

      <div className="mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Tên</th>
              <th className="px-6 py-3">Giá</th>
              <th className="px-6 py-3">Số lượng</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {attributeValues.length > 0 ? (
              attributeValues.map((value) => (
                <tr
                  key={value._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{value.name}</td>
                  <td className="px-6 py-4">{value.price}</td>
                  <td className="px-6 py-4">{value.quantity}</td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/attribute/edit/${value._id}/value`}>
                      <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                        Sửa
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttributeDetails;