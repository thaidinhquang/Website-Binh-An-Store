import { Link } from "react-router-dom";
import { useCancelOrder } from "../../../common/hooks/useCancelOrder";
// import { useConfirmOrder } from "../../../common/hooks/useConfirmOrder";
import moment from "moment";
import { Button, Pagination, Space, Table } from "antd";
import { ORDER_STATUS } from "../../../constants/order";

const TableData = ({ orders, setPage }) => {
  // const confirmOrder = useConfirmOrder();
  const cancelOrder = useCancelOrder();

  const dataSource = orders?.docs?.map((order) => ({
    key: order._id,
    orderId: order?._id,
    customer: order?.customerInfo?.name,
    paymentMethod: order?.paymentMethod?.toUpperCase(),
    orderStatus: order?.orderStatus?.toUpperCase(),
    createdAt: order?.createdAt,
    totalPrice: order?.totalPrice,
    action: <Link to={`detail/${order._id}`}>Xem chi tiết</Link>,
  }));

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
      // ellipsis: true,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer",
      key: "customer",
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text) => {
        if (text === "DELIVERED") {
          return <span className="text-blue-500 font-semibold">{text}</span>;
        } else if (text === "DONE") {
          return <span className="text-green-500 font-semibold">{text}</span>;
        } else if (text === "CANCELLED") {
          return <span className="text-red-500 font-semibold">{text}</span>;
        }
        return <span className="text-yellow-500 font-semibold">{text}</span>;
      },
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: (value) => {
        return moment(value).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => {
          // Format the totalPrice with currency symbol "vnd"
          const formattedPrice = new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
          }).format(text || 0);

          return <span>{formattedPrice}</span>;
      },
  },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: "20%",
      render: (value, _record) => {
        const status = _record?.orderStatus?.toLowerCase();

        return (
          <Space>
            
          {status === ORDER_STATUS.PENDING && (
              <Button onClick={() => cancelOrder.mutate(_record.orderId)}>
                Hủy đơn hàng
              </Button>
            )}
            <Button>{value}</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource || []}
        columns={columns}
        className="mt-10 min-h-[68vh]"
        pagination={false}
        scroll={{
          y: 600,
             }}
      />

      <Space className="flex justify-end w-full mt-4">
        {orders?.totalPages > 1 && (
          <Pagination
            total={orders?.totalDocs}
            showSizeChanger={false}
            pageSize={orders?.limit}
            defaultCurrent={orders?.page}
            onChange={(page) => setPage(page)}
          />
        )}
      </Space>
    </>
  );
};

export default TableData;