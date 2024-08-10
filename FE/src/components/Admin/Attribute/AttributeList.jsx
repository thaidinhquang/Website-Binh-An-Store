import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../config/axios";
import Pageination from "../../UI/Pagination";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import CommonUtils from "../../../common/CommonUtils/CommonUtils";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const AttributeList = () => {
    const queryClient = useQueryClient()
    const { data,isLoading } = useQuery({
        queryKey: ["ATTRIBUTE"],
        queryFn: async () => {
          const { data } = await instance.get(`/attributes`);
          return data;
        },
      });

      const { mutate} = useMutation({
        mutationFn: async (id) => {
          const { data } = await instance.delete(`/attributes/${id}`,{active: true});
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["ATTRIBUTE"]
          })
          toast.success("Thuộc tính đã được xóa thành công!");
        },
       
      });

      const { mutate:restore} = useMutation({
        mutationFn: async (id) => {
          const { data } = await instance.delete(`/attributes/restore/${id}`,{active: true});
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["ATTRIBUTE"]
          })
          toast.success("Thuộc tính đã được khôi phục thành công!");
        },
       
      });
      const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(price);
      };


      const exportToExcel = async () => {
        const dataToExport = data?.map(attribute => ({
            ID: attribute._id,
            Name: attribute.name,
            Active: attribute.active ? 'Active' : 'False',
            Values: attribute.values.map(val => `${val.name} (${formatPrice(val.price)})`).join(', '), // Format price
            CreatedAt: new Date(attribute.createdAt).toLocaleString(), // Format creation date and time
            UpdatedAt: new Date(attribute.updatedAt).toLocaleString(), // Format update date and time
        }));
        await CommonUtils.exportExcel(dataToExport, 'Attributes', 'AttributeList');
    };
    if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">Danh sách thuộc tính</h2>
        <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            
                <Link to={`/admin/attribute/add`} className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                    Thêm thuộc tính
                </Link>
                <Button onClick={exportToExcel} type="default" icon={<FontAwesomeIcon icon={faFileExcel} />}>
                Xuất Excel
              </Button>
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
                                        Mã
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Tên thuộc tính
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Hành động
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Trạng thái
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? data.map((attribute, index) => (
                                    <tr key={attribute._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{attribute._id}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{attribute.name}</p>
                                        </td>
                                        
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <Link to={`/admin/attribute/detail/${attribute._id}`} className="text-red-600 hover:text-blue-900 mx-2">
                                                Chi tiết
                                            </Link>
                                            <Link to={`/admin/attribute/edit/${attribute._id}`} className="text-yellow-600 hover:text-yellow-900 mx-2">
                                                Sửa
                                            </Link>
                                            <Link to={`/admin/attribute/add/${attribute._id}/value`} className="text-blue-600 hover:text-yellow-900">
                                                Thêm 
                                            </Link>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" checked={attribute.active}  onChange={() => 
                                                attribute.active ? mutate(attribute._id) : restore(attribute._id)
                                            }  />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">Không có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pageination data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttributeList;