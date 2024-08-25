import { Pagination, Space, Table } from "antd";
import { Link } from "react-router-dom";

const TableProduct = ({product,setPage}) => {

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      };
    const dataSource = product?.docs?.map((product,index) => ({
      
        key:product._id,
        index:index+1,
        id: product?._id,
        name: (
          <div>
            {product?.name}
            <div style={{ fontSize: '0.8em', color: 'gray' }}>{product?._id}</div>
          </div>
        ),
        image:( <div>
            <img src={product?.image} width={80} className=" rounded-lg" alt="" />
            <img src={product.gallery} width={80} className=" rounded-lg" alt="" />
            </div>),
       
        price:product?.productItems[0]?.price, // Extract price from the first productItem
        action: <Link to={`/admin/products/detail/${product._id}`}>Chi tiết</Link>,
      }));

      const columns = [
      {
          title: "",
          dataIndex: "index",
          key: "index",
        },
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
          title: "Thao tác",
          dataIndex: "action",
          key: "action",
       
        },
    
    ]
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

    
  )
}

export default TableProduct