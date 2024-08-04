import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Space, Input } from "antd";
import { useOrders_by_user } from "../../../common/hooks/useOrders.jsx";
import TableData from "./TableData.jsx";
import FilterStatus from "./FilterStatus.jsx";


const OrderProfile = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const queryClient = useQueryClient();

  const { data: orders } = useOrders_by_user({
    search: search,
    page: page,
    limit: limit,
    paymentMethod: paymentMethod,
    isPaid: isPaid,
    orderStatus: orderStatus,
  });



  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["orders"],
    });
  }, [paymentMethod, isPaid, orderStatus, page, search]);

  return (
    <div className="w-full h-ful">
      <Space className="font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4">
        Đơn hàng của tôi
      </Space>

      <FilterStatus
        setOrderStatus={setOrderStatus}
        setPaymentMethod={setPaymentMethod}
      />

      <Space className="mt-[1rem]">
       
        <Space>
          <Input
            placeholder="Tìm kiếm Đơn hàng..."
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            className="py-3"
          />
        </Space>
      </Space>

      <TableData
        orders={orders}
        setPage={setPage}
        setLimit={setLimit}
        setPaymentMethod={setPaymentMethod}
        setIsPaid={setIsPaid}
        setOrderStatus={setOrderStatus}
      />
    </div>
  );
};

export default OrderProfile;