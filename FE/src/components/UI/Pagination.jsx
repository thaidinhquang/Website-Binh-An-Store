import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Space } from "antd";

const Pageination = ({ data }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const changePage = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', newPage);
        navigate(`?${searchParams.toString()}`);
    };
    return (
        <>
            <Space className="flex justify-end w-full mt-4">
                {data?.totalPages > 1 && (
                    <Pagination
                        total={data?.totalDocs}
                        showSizeChanger={false}
                        pageSize={data?.limit}
                        current={data?.page}
                        onChange={(page) => changePage(page)}
                    />
                )}
            </Space>
        </>
    );
}

export default Pageination