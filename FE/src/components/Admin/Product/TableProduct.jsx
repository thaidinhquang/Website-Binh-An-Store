import { Pagination, Space, Table } from "antd";
import { Link } from "react-router-dom";

const TableProduct = ({ product, setPage }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const colors = [
    "bg-red-200 text-red-800",
    // "bg-green-200 text-green-800",
    "bg-blue-200 text-blue-800",
    // "bg-yellow-200 text-yellow-800",
    // "bg-purple-200 text-purple-800",
    // "bg-pink-200 text-pink-800",
    // "bg-indigo-200 text-indigo-800",
  ];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  const dataSource = product?.docs?.map((product, index) => ({
    key: product._id,
    index: index + 1,
    id: product?._id,
    name: (
      <div>
        {product?.name}
        <div style={{ fontSize: '0.8em', color: 'gray' }}>{product?._id}</div>
      </div>
    ),
    image: (
      <div className="flex flex-wrap gap-2">
        <img src={product?.image} width={80} className="rounded-lg" alt="" />
        {product?.gallery?.map((img, idx) => (
          <img key={idx} src={img} width={80} className="rounded-lg" alt="" />
        ))}
      </div>
    ),
    variants: product?.productItems.map((item, idx) => (
      <div key={idx} className="mb-2">
        {item.variants.map((variant, vIdx) => (
          <span
            key={vIdx}
            className={`inline-block ${getColor(vIdx)} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded`}
          >
            {variant.key}: {variant.value}
          </span>
        ))}
      </div>
    )),
    price: product?.productItems[0]?.price, // Extract price from the first productItem
    quantity: product?.productItems.reduce((total, item) => total + item.stock, 0), // Calculate total quantity of all variants
    action: <Link to={`/admin/products/detail/${product._id}`}>Chi tiết</Link>,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Biến thể",
      dataIndex: "variants",
      key: "variants",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="mt-10"
        pagination={false}
      />
      <Space className="flex justify-end w-full mt-4">
        {product?.totalPages > 1 && (
          <Pagination
            total={product?.totalDocs}
            showSizeChanger={false}
            pageSize={product?.limit}
            defaultCurrent={product?.page}
            onChange={(page) => setPage(page)}
          />
        )}
      </Space>
    </>
  );
};

export default TableProduct;