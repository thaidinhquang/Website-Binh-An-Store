import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, Typography, Pagination, Card, Tag, Space, message } from 'antd';
import { CalendarOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

const { Title, Text, Paragraph } = Typography;

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  author: string;
  tags: string[];
}

const AllBlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const pageSize = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/blogs?page=${currentPage}&limit=${pageSize}`);
        
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
          setTotalBlogs(response.data.length);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setBlogs([]);
          setTotalBlogs(0);
          message.error("Failed to load blogs. Unexpected data structure.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setTotalBlogs(0);
        message.error("Failed to load blogs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateMarkdown = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    const truncated = content.substr(0, content.lastIndexOf(' ', maxLength));
    return truncated + '...';
  };

  if (isLoading) return <Spin size="large" className="flex justify-center items-center h-screen" />;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Title level={2} className="text-center mb-8">Our Blog</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={6}>
            <Card className="shadow-md">
              <Title level={4} className="mb-4">Categories</Title>
              {/* Add categories here */}
              <div className="mt-8">
                <img
                  src={`/assets/images/ads-5.png`}
                  alt="Advertisement"
                  className="w-full rounded-lg"
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={18}>
            <Card className="shadow-md mb-6">
              <Text>
                Showing {blogs.length} of {totalBlogs} results
              </Text>
            </Card>
            <Row gutter={[24, 24]}>
              {blogs.map((blog: Blog) => (
                <Col xs={24} sm={12} xl={8} key={blog._id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={blog.title}
                        src={blog.image}
                        className="h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/assets/images/fallback-image.jpg';
                        }}
                      />
                    }
                    className="shadow-md h-full flex flex-col"
                  >
                    <Card.Meta
                      title={<Link to={`/blogs/${blog._id}`} className="text-lg font-semibold hover:text-blue-600">{blog.title}</Link>}
                      description={
                        <>
                          <div className="text-black prose prose-sm max-w-none">
                            <ReactMarkdown>
                              {truncateMarkdown(blog.content, 150)}
                            </ReactMarkdown>
                          </div>
                          <Space className="mt-2" size={[0, 8]} wrap>
                            {blog.tags && blog.tags.map(tag => (
                              <Tag key={tag} color="blue">{tag}</Tag>
                            ))}
                          </Space>
                          <div className="mt-4 flex justify-between items-center text-sm text-black">
                            <span><CalendarOutlined className="mr-1" /> {formatDate(blog.createdAt)}</span>
                            <span><UserOutlined className="mr-1" /> {blog.author}</span>
                          </div>
                        </>
                      }
                    />
                    <Link to={`/blogs/${blog._id}`} className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                      Xem Thêm
                      <EyeOutlined className="ml-2" />
                    </Link>
                  </Card>
                </Col>
              ))}
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