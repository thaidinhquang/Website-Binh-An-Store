import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";
import { Spin, Row, Col, Typography, Pagination } from 'antd';

const { Title, Text } = Typography;

const AllBlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const pageSize = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/blogs?page=${currentPage}&limit=${pageSize}`);
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
          setTotalBlogs(response.data.length);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setBlogs([]);
          setTotalBlogs(0);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setTotalBlogs(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Spin size="large" className="flex justify-center items-center h-screen" />;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Title level={2} className="text-center mb-8">Our Blog</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={6}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Title level={4} className="mb-4">Categories</Title>
              {/* Add categories here */}
              <div className="mt-8">
                <img
                  src={`/assets/images/ads-5.png`}
                  alt="Advertisement"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </Col>
          <Col xs={24} lg={18}>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <Text>
                Showing {blogs.length > 0 ? `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, totalBlogs)}` : '0'} of {totalBlogs} results
              </Text>
            </div>
            <Row gutter={[24, 24]}>
              {blogs.length > 0 ? (
                blogs.map((blog: any) => (
                  <Col xs={24} sm={12} xl={8} key={blog._id}>
                    <Blog blog={blog} />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Text>No blogs found</Text>
                </Col>
              )}
            </Row>
            {totalBlogs > pageSize && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  current={currentPage}
                  total={totalBlogs}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
            <div className="mt-8">
              <img
                src={`/assets/images/ads-6.png`}
                alt="Advertisement"
                className="w-full rounded-lg"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AllBlogPage;