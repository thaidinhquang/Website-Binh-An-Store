import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Spin, Typography, Breadcrumb, Tag, Divider } from 'antd';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  author: string;
  tags: string[];
}

const DetailBlogPage: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blogs/${id}`);
        setBlog(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) return <Spin size="large" className="flex justify-center items-center h-screen" />;
  if (!blog) return <div className="text-center py-10">Blog not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumb className="mb-6">
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/blogs">Blogs</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{blog.title}</Breadcrumb.Item>
        </Breadcrumb>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {blog.image && (
            <div className="w-full h-[400px] relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <Title level={1} className="mb-4">{blog.title}</Title>
            
            <div className="flex items-center text-gray-500 mb-6">
              <CalendarOutlined className="mr-2" />
              <span className="mr-4">{new Date(blog.createdAt).toLocaleDateString()}</span>
              <UserOutlined className="mr-2" />
              <span>{blog.author}</span>
            </div>

            <div className="mb-6">
              {blog.tags && blog.tags.map(tag => (
                <Tag key={tag} color="blue" className="mr-2">{tag}</Tag>
              ))}
            </div>

            <Divider />

            <div className="content-area prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            <Divider />

            <div className="flex justify-between items-center mt-8">
              <Link
                to="/blogs"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Back to Blogs
              </Link>
              {/* You can add share buttons or other actions here */}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default DetailBlogPage;