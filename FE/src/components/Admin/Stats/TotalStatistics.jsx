import { Card, Col, Row, Statistic } from "antd";
import { FaLuggageCart, FaUserEdit } from "react-icons/fa";
import { LuReceipt } from "react-icons/lu";

const TotalStatistics = ({ stats }) => {
  console.log(stats);
  return (
    <Row className="w-full gap-3 py-2" justify={"center"}>
      <Col span={7}>
        <Card bordered={false} className="shadow-lg cursor-pointer">
          <Statistic
            title="Products"
            value={stats.totalProducts}
            prefix={<FaLuggageCart />}
            className="font-bold text-lg"
          />
        </Card>
      </Col>
      <Col span={7}>
        <Card bordered={false} className="shadow-lg cursor-pointer">
          <Statistic
            title="Orders"
            value={stats.totalOrders}
            prefix={<LuReceipt />}
            className="font-bold text-lg"
          />
        </Card>
      </Col>
      <Col span={7}>
        <Card bordered={false} className="shadow-lg cursor-pointer">
          <Statistic
            title="Users"
            value={stats.totalUsers}
            prefix={<FaUserEdit />}
            className="font-bold text-lg"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default TotalStatistics;
