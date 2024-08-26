import { Table } from 'antd';

const TopSellingProductsTable = ({ data, isLoading, formatPrice }) => {
  const columns = [
    {
      title: 'Đơn hàng',
      dataIndex: 'order',
      key: 'order',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Ảnh Sản Phẩm',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (text) => <img src={text} width={100} className="rounded-lg" alt="" />,
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => <p className="inline-block">{text}</p>,
    },
    {
      title: 'Giá Sản Phẩm',
      dataIndex: 'productPrice',
      key: 'productPrice',
    },
    {
      title: 'Số Sản Phẩm Đã Bán',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Tổng',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => formatPrice(record.productPrice * record.totalQuantity),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="_id"
      loading={isLoading}
      pagination={false}
      className=""
    />
  );
};

export default TopSellingProductsTable;