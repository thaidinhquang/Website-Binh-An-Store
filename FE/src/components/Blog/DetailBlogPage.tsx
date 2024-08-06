import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Spin, Typography, Breadcrumb, Tag, Divider, message, Space } from 'antd';
import { CalendarOutlined, UserOutlined, TagOutlined, ShareAltOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const { Title, Paragraph } = Typography;

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  author: string;
  tags?: string[];
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
        message.error("Failed to load blog. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // useEffect(() => {
  //   if (blog) {
  //     console.log("Blog content:", blog.content);
  //   }
  // }, [blog]);

  if (isLoading) return <Spin size="large" className="flex justify-center items-center h-screen" />;
  if (!blog) return <div className="text-center py-10">Blog not found</div>;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
                onError={(e) => {
                  console.error("Error loading image:", e);
                  e.currentTarget.src = '/assets/images/fallback-image.jpg';
                  message.warning("Failed to load blog image.");
                }}
              />
            </div>
          )}

          <div className="p-8">
            <Title level={1} className="mb-4">{blog.title}</Title>
            
            <Space className="text-black mb-6" size={16} wrap>
              <span><CalendarOutlined className="mr-2" />{formatDate(blog.createdAt)}</span>
              <span><UserOutlined className="mr-2" />{blog.author}</span>
              {blog.tags && blog.tags.length > 0 && (
                <span><TagOutlined className="mr-2" />{blog.tags.join(', ')}</span>
              )}
            </Space>

            <Divider />

            <div className="content-area prose max-w-none text-black">
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-4xl font-bold my-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-3xl font-bold my-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-2xl font-bold my-2" {...props} />,
                  h4: ({node, ...props}) => <h4 className="text-xl font-bold my-2" {...props} />,
                  h5: ({node, ...props}) => <h5 className="text-lg font-bold my-2" {...props} />,
                  p: ({node, ...props}) => <p className="my-2" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside my-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />,
                  a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                  img: ({node, ...props}) => <img className="max-w-full h-auto my-2" {...props} />,
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-4">
                      <table className="table-auto border-collapse border border-gray-300 w-full" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                  th: ({node, ...props}) => <th className="border border-gray-300 px-4 py-2 text-left" {...props} />,
                  td: ({node, ...props}) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>

            <Divider />

            <Space className="mt-8" size={16} wrap>
              <Link
                to="/blogs"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Back to Blogs
              </Link>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                <ShareAltOutlined className="mr-2" />Share
              </button>
            </Space>
          </div>
        </article>
      </div>
    </div>
  );
};

export default DetailBlogPage;