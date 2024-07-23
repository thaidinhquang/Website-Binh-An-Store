import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Space, Input } from "antd";
import { useOrders } from "../../../common/hooks/useOrders.jsx";
import TableData from "./TableData.jsx";
import FilterStatus from "./FilterStatus.jsx";
import { ORDER_STATUS } from "../../../constants/order.js";

const OrderAdmin = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const queryClient = useQueryClient();

  const { data: orders } = useOrders({
    search: search,
    page: page,
    limit: limit,
    paymentMethod: paymentMethod,
    isPaid: isPaid,
    orderStatus: orderStatus,
  });

  const countPendingOrders = orders?.docs?.filter(
    (order) => order.orderStatus === ORDER_STATUS.PENDING
  ).length;

  const countConfirmedOrders = orders?.docs?.filter(
    (order) => order.orderStatus === ORDER_STATUS.CONFIRMED
  ).length;

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["orders"],
    });
  }, [paymentMethod, isPaid, orderStatus, page, search]);

  return (
    <div className="w-full h-ful">
      <Space className="font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4">
        Danh sách đơn hàng
      </Space>

      <FilterStatus
        setOrderStatus={setOrderStatus}
        setPaymentMethod={setPaymentMethod}
      />

      <Space className="mt-[1rem]">
        <span className="border rounded-xl p-4 font-semibold">
          Trạng thái đơn hàng
        </span>{" "}
        <Button className="h-[3rem] font-semibold text-[1rem]">
          Chưa xử lý {countPendingOrders}
        </Button>{" "}
        <Button className="h-[3rem] font-semibold text-[1rem]">
          Đã xử lý {countConfirmedOrders}
        </Button>
        <Space>
          <Input
            placeholder="Tìm kiếm khách hàng..."
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

export default OrderAdmin;