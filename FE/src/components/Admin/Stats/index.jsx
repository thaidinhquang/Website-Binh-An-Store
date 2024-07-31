import useOrdersStatistics from "../../../common/hooks/useOrdersStatistics";
import useTotalStatistics from "../../../common/hooks/useTotalStatistics";
import OrdersByDayChart from "./OrdersByDayChart";
import OrdersByMonth from "./OrdersByMonth";
import TotalStatistics from "./TotalStatistics";
import { useTanstackMutation, useTanstackQuery } from "../../../common/hooks/useTanstackQuery";
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { DatePicker } from 'antd';
import { set } from "@ant-design/plots/es/core/utils";

const Statistics = () => {
  const { data: statsData } = useTotalStatistics();
  const { data: orderStats } = useOrdersStatistics();
  const [sort, setSort] = useState(-1);
  const [fromDate, setFromDate1] = useState("");
  const [toDate, setToDate1] = useState("");

  const { data, isLoading, refetch } = useTanstackQuery('orders/report', {
    limit: 10, sort: sort, startDate: fromDate??"", endDate: toDate??""
  })

  useEffect(() => {
    refetch();
  }, [sort]);

  const onChange = (dateDate, dateString, type) => {
    if(type == "fromDate"){
      setFromDate(dateDate);
    }
    if(type == "toDate"){
      setToDate(dateDate)
    }
  };

  const stats = statsData?.data && statsData?.data?.data;

  return (
    <div className="w-full h-full bg-gray-100 p-6"> {/* Added bg-gray-100 and p-6 */}
      {/* Total Statistics Section */}
      <TotalStatistics stats={stats} />
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md"> {/* Added p-6, rounded-lg, and shadow-md */}
        <h2 className="text-xl font-semibold mb-4">Doanh số theo ngày</h2>
        <OrdersByDayChart stats={stats} />
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md"> {/* Added p-6, rounded-lg, and shadow-md */}
        <h2 className="text-xl font-semibold mb-4">Thống kê theo tháng</h2>
        <OrdersByMonth orderStats={orderStats} />
      </div>
      <div className="mt-[5rem]">
        <h2 className="font-semibold my-4">Thống kê top sản phẩm bán chạy nhất</h2>
        <div className="my-8">
          <span>Từ ngày</span>
          <DatePicker className="ml-[10px]" onChange={(date, dateString)=>onChange(date, dateString,"fromDate")} />
          <span className="ml-[20px]">Đến ngày</span>
          <DatePicker className="ml-[10px]" onChange={(date, dateString)=>onChange(date, dateString,"toDate")} />
          <button onClick={refetch} className="w-[20px] ml-[10px] pt-[10px]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg></button>
          <button onClick={()=>{setSort(sort == 1 ? -1 : 1)}} className="w-[13px] ml-[20px] pt-[10px]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg></button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <td scope="col" className="px-6 py-3">Order</td>
                <td scope="col" className="px-6 py-3">Ảnh Sản Phẩm</td>
                <td scope="col" className="px-6 py-3" >Tên Sản Phẩm</td>
                <td scope="col" className="px-6 py-3">Giá Sản Phẩm</td>
                <td scope="col" className="px-6 py-3">Số Sản Phẩm Đã Bán</td>
                <td scope="col" className="px-6 py-3">Chi tiết</td>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? data.map((product, index) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th className="px-6 py-4">{index + 1}</th>
                  <th className="px-6 py-4">
                    <img src={product.productImage} width={100} className=" rounded-lg" alt="" />
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <p className="inline-block">{product.productName}</p>
                  </th>
                  <th className="px-6 py-4">{product.productPrice}</th>
                  <th className="px-6 py-4">{product.totalQuantity}</th>
                  <th className="px-6 py-4">
                    <span> <Link to={`/detail/${product._id}`}>--{">"}</Link></span>
                  </th>
                </tr>
              )) :
                <tr>
                  <td colSpan={6} className="text-center">Không có sản phẩm nào</td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
