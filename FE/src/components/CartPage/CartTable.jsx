import React from "react";
import { Table, Checkbox } from "antd";
import { calculateTotalPrice, formatPrice } from "../utils/priceUtils";
// import { formatPrice, calculateTotalPrice } from "../../utils"; // Assuming you have these utility functions

const CartTable = ({ data, state, onchangeItemsChecked, updateProduct, onHandleRemove }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (text, item) => (
        <Checkbox
          onChange={(e) => onchangeItemsChecked(e, item)}
          checked={item.productId.stock > 0 && state?.items?.some(v => v._id === item._id)}
          disabled={item.productId.stock === 0}
        />
      ),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, item) => (
        <div className="flex space-x-6 items-center relative">
          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
            <img
              src={item?.image || item?.productId?.image}
              alt="product"
              className="w-full h-full object-contain"
            />
            {item.productId.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold">
                Hết hàng
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <p className="font-medium text-[15px] text-qblack">{item.name}</p>
            <div>{item?.productId?.variants?.map(variant => variant.value).join(", ")}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, item) => formatPrice(item?.productId?.price),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, item) => (
        <div className="flex justify-center items-center space-x-2">
          <button
            disabled={item.quantity === 1}
            onClick={() => updateProduct(item, "decrease")}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
          >
            -
          </button>
          <input
            type="text"
            value={item.quantity}
            readOnly
            className="w-12 text-center border border-gray-300 rounded"
          />
          <button
            onClick={() => updateProduct(item, "increase")}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
            disabled={item?.quantity >= item.productId?.stock}
          >
            +
          </button>
        </div>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text, item) => formatPrice(calculateTotalPrice(item)),
    },
    {
      title: '',
      dataIndex: 'remove',
      key: 'remove',
      render: (text, item) => (
        <span
          onClick={() => onHandleRemove(item.productId._id)}
          className="cursor-pointer hover:text-red-500"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
          >
            <path d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z" />
          </svg>
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data.products}
      rowKey={item => item._id}
      pagination={false}
    />
  );
};

export default CartTable;