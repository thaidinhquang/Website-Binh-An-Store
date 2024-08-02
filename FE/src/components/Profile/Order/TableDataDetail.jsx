import { Table, Button } from "antd";
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const TableDataDetail = ({ order }) => {
  const navigate = useNavigate();

  const dataSource = order?.items?.length
    ? order.items.map((item) => ({
        key: item.productId,
        name: item.name,
        image: <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />,
        quantity: item.quantity,
        price: item.price,
        subTotal: item.quantity * item.price,
      }))
    : [];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleRateProduct = (record) => {
      navigate(`/review/${record.key}`);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      className: 'font-bold',
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Tổng tiền",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Đánh giá sản phẩm",
      key: "rate",
      render: (text, record) => (
        <Button
          onClick={() => handleRateProduct(record)}
          type="primary"
          icon={<StarOutlined />}
          className="bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 flex items-center text-white"
        >
          Đánh giá
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      className="text-sm"
      pagination={false}
    />
  );
};

export default TableDataDetail;
