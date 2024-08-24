import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {  Space, Input, Select, Button } from "antd";
import { useOrders } from "../../../common/hooks/useOrders.jsx";
import TableData from "./TableData.jsx";
import FilterStatus from "./FilterStatus.jsx";
import { ORDER_STATUS } from "../../../constants/order.js";
import CommonUtils from "../../../common/CommonUtils/CommonUtils.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

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


  const exportToExcel = async () => {
    const dataToExport = orders?.docs?.map(order => ({
      ID: order._id,
      CustomerName: order.customerName,
      OrderStatus: order.orderStatus,
      PaymentMethod: order.paymentMethod,
      IsPaid: order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
      CreatedAt: new Date(order.createdAt).toLocaleString(),
      UpdatedAt: new Date(order.updatedAt).toLocaleString()
    }));
    await CommonUtils.exportExcel(dataToExport, 'Orders', 'OrderList');
  };
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
        <span className="border rounded-xl p-4 font-semibold ">
          Trạng thái đơn hàng
        </span>
        <Select
          placeholder="Select Order Status"
          onChange={(value) => setOrderStatus(value)}
          className="h-[3rem] font-semibold text-[1rem]"
        >
          <Option value={ORDER_STATUS.PENDING}>
            Chưa xử lý {countPendingOrders}
          </Option>
          <Option value={ORDER_STATUS.CONFIRMED}>
            Đã xử lý {countConfirmedOrders}
          </Option>
        </Select>
        <Space>
          <Input
            placeholder="Tìm kiếm Đơn hàng..."
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            className="py-3"
          />
        </Space>
      </Space>
      <div className="flex justify-end ">
      <Button onClick={exportToExcel} type="default" icon={<FontAwesomeIcon icon={faFileExcel} />}>
      Xuất Excel
    </Button>
    </div>
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
