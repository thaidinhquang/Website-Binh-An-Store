import { Space, Steps } from "antd";
import { FaUserCheck } from "react-icons/fa6";
import { MdLocalShipping } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { CiStar, CiUser } from "react-icons/ci";
import { ORDER_STATUS } from "../../../constants/order";

const OrderProcessing = ({ order }) => {
  const currentStep = () => {
    switch (order?.orderStatus) {
      case ORDER_STATUS.PENDING:
        return 0;
      case ORDER_STATUS.CONFIRMED:
        return 1;
      case ORDER_STATUS.SHIPPING:
        return 2;
      case ORDER_STATUS.DELIVERED:
        return 3;
      case ORDER_STATUS.DONE:
        return 4;
      default:
        return 0;
    }
  };

  console.log("order", currentStep());

  return (
    <Space className="bg-[#ffff] w-full p-4 rounded-lg font-semibold border flex-col">
      <Space className="flex flex-col">
        {order?.orderStatus === ORDER_STATUS.CANCELLED ? (
          <>
            <h2 className="text-red-500">
              Đơn hàng đã bị hủy{" "}
              {`${order.cancelledBy === "admin" ? `bởi Admin` : ""}`}
            </h2>
            <p>{`${
              order?.canceledReason ??
              "Chúng tôi rất tiếc về sự cố với đơn hàng của bạn. Vui lòng liên hệ lại bộ phận chăm sóc khách hàng để được hỗ trợ."
            }`}</p>
          </>
        ) : (
          <Steps
            size="default"
            current={currentStep()}
            className="w-full"
            items={[
              {
                title: "Chờ Xác nhận",
                icon: <CiUser />,
                className: "text-primary ",
              },
              {
                title: "Đã xác nhận",
                icon: <FaUserCheck />,
                className: "text-primary mr-5",
              },
              {
                title: "Đang giao hàng",
                icon: <MdLocalShipping />,
                className: "text-primary mr-5",
              },
              {
                title: "Đã giao hàng",
                className: "text-primary mr-5",
                icon: <RiBillLine />,
              },
              {
                title: "Hoàn thành",
                className: "text-primary mr-5",
                icon: <CiStar />,
              },
            ]}
          />
        )}
      </Space>
    </Space>
  );
};

export default OrderProcessing;
