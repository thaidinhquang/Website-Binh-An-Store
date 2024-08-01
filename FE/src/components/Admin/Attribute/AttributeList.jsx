import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../config/axios";
import Pageination from "../../UI/Pagination";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useHookSearch } from "../../../common/hooks/useSearch";

const AttributeList = () => {
    const queryClient = useQueryClient();
    const search = new URLSearchParams(useLocation().search);
    const page = search.get('page') || 1;
    const sort = search.get('sort') || '';
    const name = search.get('name') || '';
    const active = search.get('active') || '';
    const form = useForm();
    const useSearch = useHookSearch();

    const { data, isLoading } = useQuery({
        queryKey: ["ATTRIBUTE", { page, sort, name, active }],
        queryFn: async () => {
          const { data } = await instance.get(`/attributes`, { params: { page, sort, name, active } });
          return data;
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (id) => {
          const { data } = await instance.delete(`/attributes/${id}`);
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ATTRIBUTE"] });
          toast.success("Thuộc tính đã được xóa thành công!");
        },
    });

    const { mutate: restore } = useMutation({
        mutationFn: async (id) => {
          const { data } = await instance.delete(`/attributes/restore/${id}`);
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ATTRIBUTE"] });
          toast.success("Thuộc tính đã được khôi phục thành công!");
        },
    });

    const searchForm = (data) => {
        useSearch(data, '/admin/attributes');
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold mb-4 md:mb-0">Danh sách thuộc tính</h2>
                    <Link to={`/admin/attribute/add`} className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                        Thêm thuộc tính
                    </Link>
                </div>
                <form onSubmit={form.handleSubmit(searchForm)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                            <input
                                type="text"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Tìm kiếm theo tên thuộc tính"
                                {...form.register('name')}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                            <select
                                {...form.register('sort')}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                                <option value="">Mới {'->'} cũ</option>
                                <option value="createdAt:1">Cũ {'->'} mới</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">STT</th>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Mã</th>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Tên thuộc tính</th>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Hành động</th>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.docs?.length > 0 ? data.docs.map((attribute, index) => (
                                    <tr key={attribute._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{attribute._id}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{attribute.name}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="dropdown dropdown-hover">
                                                <div tabIndex={0} role="button" className="btn m-1">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                    </svg>
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><Link to={`/admin/attribute/add/${attribute._id}/value`}>Thêm thuộc tính</Link></li>
                                                    <li><Link to={`/admin/attribute/edit/${attribute._id}`}>Sửa</Link></li>
                                                    <li><button onClick={() => mutate(attribute._id)}>Xóa</button></li>
                                                    <li><Link to={`/admin/attribute/detail/${attribute._id}`}>Chi tiết</Link></li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" checked={attribute.active} onChange={() => attribute.active ? mutate(attribute._id) : restore(attribute._id)} />
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
                        {/* <Pageination data={data} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttributeList;