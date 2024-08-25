import { Card, Col, Row, Statistic } from "antd";
import { FaLuggageCart, FaUserEdit } from "react-icons/fa";
import { LuReceipt } from "react-icons/lu";

const TotalStatistics = ({ stats }) => {
  return (
    <Row className="w-full gap-3 py-2" justify={"center"}>
      <Col span={7}>
        <Card bordered={false} className="shadow-lg cursor-pointer">
          <Statistic
            title="Sản phẩm"
            value={stats?.totalProducts ?? 0}
            prefix={<FaLuggageCart />}
            className="font-bold text-lg"
          />
        </Card>
      </Col>
      <Col span={7}>
        <Card bordered={false} className="shadow-lg cursor-pointer">
          <Statistic
            title="Đơn hàng"
            value={stats?.totalOrders ?? 0}
            prefix={<LuReceipt />}
            className="font-bold text-lg"
          />
        </Card>
      </Col>
      <Col span={7}>
        <Card bordered={false} className="shadow-lg cursor-pointer">
          <Statistic
            title="Tài khoản"
            value={stats?.totalUsers ?? 0}
            prefix={<FaUserEdit />}
            className="font-bold text-lg"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default TotalStatistics;
