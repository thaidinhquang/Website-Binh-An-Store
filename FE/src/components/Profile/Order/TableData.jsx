import { Button, Pagination, Space, Table } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { useFinishOrder } from "../../../common/hooks/useFinishOrder";
import { ORDER_STATUS } from "../../../constants/order";
import CancelModal from "../../Admin/order/CancelModal";

const TableData = ({ orders, setPage }) => {

  const finishOrder = useFinishOrder();

  const dataSource = orders?.docs?.map((order) => ({
    key: order._id,
    code: order?.code ?? order?._id,
    customer: order?.customerInfo?.name,
    paymentMethod: order?.paymentMethod?.toUpperCase(),
    orderStatus: order?.orderStatus?.toUpperCase(),
    createdAt: order?.createdAt,
    totalPrice: order?.totalPrice,
    action: <Link to={`/profile/orders/${order._id}`}>Xem chi tiết</Link>,
  }));

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
      width: "15%",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer",
      key: "customer",
      width: "10%",
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: "10%",
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: "10%",
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
      width: "10%",
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: (value) => {
        return moment(value).format(" HH:mm:ss DD/MM/YYYY");
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
              <>
                <CancelModal order={_record} />
              </>
            )}
            {status === ORDER_STATUS.DELIVERED && (
              <Button onClick={(e) => handleFinish(e, _record.key)}>
                Nhận hàng
              </Button>
            )}
            <Button>{value}</Button>
          </Space>
        );
      },
    },
  ];

  const handleFinish = (e, orderId) => {
    e.preventDefault();

    finishOrder.mutate(orderId, {
      onSuccess: () => {
        toast.success("Finish order successfully");
      },
      onError: () => {
        toast.error("Finish order failed");
      },
    });
  };

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