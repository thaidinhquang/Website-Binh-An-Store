import { Table } from "antd";

const TableDataDetail = ({ order }) => {
  const dataSource =
    order?.items && order?.items?.length
      ? order?.items?.map((item) => ({
          key: item._id,
          name: (
            <div>
              <span className="font-bold">{item.name}</span>
              <br />
              <span className="text-xs text-gray-500">
                {item.variants?.map((variant) => variant.value).join(", ")}
              </span>
            </div>
          ),
          image: (
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          ),
          quantity: item.quantity,
          price: item.productId.price,
          subTotal: item.quantity * item.productId.price,
        }))
      : [];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
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
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      className="mt-8"
      pagination={false}
    />
  );
};

export default TableDataDetail;
