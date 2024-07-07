import { useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  return (
    <>
      <div className="mb-4">Danh sách đơn hàng</div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setStatusFilter("all")}
          className={`btn ${
            statusFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setStatusFilter("pending")}
          className={`btn ${
            statusFilter === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Chờ duyệt
        </button>
        <button
          onClick={() => setStatusFilter("shipping")}
          className={`btn ${
            statusFilter === "shipping"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Đã duyệt
        </button>
        <button
          onClick={() => setStatusFilter("completed")}
          className={`btn ${
            statusFilter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Đang xuất kho
        </button>
        <button
          onClick={() => setStatusFilter("cancelled")}
          className={`btn ${
            statusFilter === "cancelled"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Đã hủy
        </button>
        <button
          onClick={() => setStatusFilter("cancelled")}
          className={`btn ${
            statusFilter === "cancelled"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Chờ xuất
        </button>
        <button
          onClick={() => setStatusFilter("cancelled")}
          className={`btn ${
            statusFilter === "cancelled"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Chưa thanh toán
        </button>
        <button
          onClick={() => setStatusFilter("cancelled")}
          className={`btn ${
            statusFilter === "cancelled"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Đã thanh toán
        </button>
      </div>
      <div className="my-8 flex justify-between">
        <Link
          to={`/admin/products/add`}
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          thêm đơn hàng
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td scope="col" className="px-6 py-3">
                Mã đơn hàng{" "}
              </td>
              <td scope="col" className="px-6 py-3">
                Khách hàng
              </td>
              <td scope="col" className="px-6 py-3">
                Ngày bán
              </td>
              <td scope="col" className="px-6 py-3">
                Trạng thái
              </td>
              <td scope="col" className="px-6 py-3">
                Tổng tiền
              </td>
              <td scope="col" className="px-6 py-3">
                action
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4">
                <img width={100} className=" rounded-lg" alt="" />
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <p className="inline-block"></p>
              </th>
              <th className="px-6 py-4"></th>

              <th className="px-6 py-4"></th>
              <th className="px-6 py-4">
                <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 4 15"
                    >
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <button></button>
                    </li>
                    <li>
                      {" "}
                      <Link>Sửa</Link>
                    </li>
                  </ul>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
