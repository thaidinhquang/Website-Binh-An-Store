import {
  useTanstackMutation,
  useTanstackQuery,
} from "../../../common/hooks/useTanstackQuery";
import { useEffect } from "react";
import socket from "/src/config/socket";
import { Link, useLocation } from "react-router-dom";
import Pageination from "../../UI/Pagination";
import { useHookSearch } from "../../../common/hooks/useSearch";
import { useForm } from "react-hook-form";
import CommonUtils from "../../../common/CommonUtils/CommonUtils";
import { Button, Table, Input, Select } from "antd"; // Nhập Table, Input và Select từ Ant Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons"; // Nhập biểu tượng thích và không thích

const FeedbackList = () => {
  const search = new URLSearchParams(useLocation().search);
  const sort = search.get("sort") || "new";
  const query = search.get("query") || "";
  const form = useForm();
  const useSearch = useHookSearch();
  const { data, isLoading, refetch } = useTanstackQuery(
    "feedback",
    { sort, query },
    false
  );
  const { mutate: like } = useTanstackMutation({
    path: `feedback/like`,
    action: "CREATE",
  });
  const { mutate: dislike } = useTanstackMutation({
    path: `feedback/dislike`,
    action: "CREATE",
  });

  useEffect(() => {
    form.reset({ query, sort });
  }, []);

  useEffect(() => {
    refetch();
  }, [sort, query]);

  const searchForm = (data) => {
    useSearch(data, "/admin/feedback");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  const columns = [
    {
      title: 'STT',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <p className="text-gray-900 whitespace-no-wrap">{text}</p>
          <span className="text-gray-500 text-sm">Mã ID: {record._id}</span> {/* Hiển thị ID dưới tên */}
        </div>
      ),
    },
    {
      title: 'Phản hồi',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Số lượt thích/không thích',
      key: 'likes',
      render: (text, record) => (
        <span>
          <span className="text-green-500">{record.like}</span> / <span className="text-red-500">{record.dislike}</span>
        </span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div className="flex justify-start items-center">
          <Button
            type="text"
            icon={<LikeOutlined />}
            className="text-green-500"
            onClick={() => like({ id: record._id })}
          />
          <Button
            type="text"
            icon={<DislikeOutlined />}
            className="text-red-500"
            onClick={() => dislike({ id: record._id })}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <h2 className="ant-space css-dev-only-do-not-override-1uq9j6g ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small font-semibold text-lg rounded-md bg-[#E9E9E9] w-full p-4">Danh sách phản hồi</h2>
      <div className="py-8">
        <form
          onSubmit={form.handleSubmit(searchForm)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-3/5 px-3 mb-4 md:mb-0">
              <Input
                placeholder="Tìm kiếm theo tên..."
                {...form.register("query")}
              />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-4 md:mb-0">
              <Select
                {...form.register("sort")}
                defaultValue="new"
                className="w-full"
              >
                <Select.Option value="new">Mới {"->"} cũ</Select.Option>
                <Select.Option value="old">Cũ {"->"} mới</Select.Option>
              </Select>
            </div>
            <div className="w-full md:w-1/5 px-3">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Tìm kiếm
              </Button>
            </div>
          </div>
        </form>
        <div className="">
          <div className="">
            <Table
              dataSource={data?.docs}
              columns={columns}
              rowKey="_id"
              pagination={false}
              className="mt-4"
            />
            <Pageination data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;