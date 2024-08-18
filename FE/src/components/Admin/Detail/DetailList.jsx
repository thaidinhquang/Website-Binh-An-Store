import { Button, Space, Table } from "antd";
import { useGetAllDetails } from "../../../common/hooks/detail/useGetAllDetails";
import UpdateDetailModal from "./UpdateDetailModal";

const DetailList = () => {
  const { data: details } = useGetAllDetails();

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
          <Button type="primary" danger>
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

  return <Table columns={columns} dataSource={data} />;
};

export default DetailList;
