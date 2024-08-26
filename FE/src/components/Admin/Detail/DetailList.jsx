import { Button, Space, Table } from "antd";
import { useGetAllDetails } from "../../../common/hooks/detail/useGetAllDetails";
import UpdateDetailModal from "./UpdateDetailModal";
import { useState } from "react";
import CreateDetailModal from "./CreateDetailModal";
import { useDeleteDetail } from "../../../common/hooks/detail/useDeleteDetail";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/queryKey";

const DetailList = () => {
  const { data: details, refetch } = useGetAllDetails();
  const [open, setOpen] = useState(false);
  const deleteDetail = useDeleteDetail();
  const queryClient = useQueryClient();

  const handleDelete = (id) => {
    deleteDetail.mutate({id},{
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEY.DETAILS]
        })
        toast.success("Xóa thành công");
      }
    });
    refetch();
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <UpdateDetailModal record={record} />
          <Button onClick={()=>{handleDelete(record.key)}} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = details?.map((detail, index) => ({
    key: `${detail._id}`,
    name: detail.key,
  }));

  return (
    <div>
    

    
      <Button type="primary text-[black]" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setOpen(true)}>
          Thêm chi tiết sản phẩm
      </Button>
      <Table columns={columns} dataSource={data} />
      {open && (
        <Space size="middle">
          <CreateDetailModal open={open} onclose={(isopen)=>{setOpen(isopen);refetch()}}/>
        </Space>
      )}
    </div>
  );
};

export default DetailList;