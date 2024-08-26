import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Divider, Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  CommentOutlined,
  FileTextOutlined,
  FlagOutlined,
  LaptopOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const DashBoard = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        width={250}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ position: 'fixed', height: '100vh' }} // Fixed Sider
      >
      
        <Menu theme="dark" defaultSelectedKeys={[activeLink]} mode="inline">
        <Divider />
    
          <Menu.Item key="/admin" icon={<DashboardOutlined />} onClick={() => handleLinkClick('/admin')}>
            <Link to="/admin">Quản lý thông kê</Link>
          </Menu.Item>
          <Menu.Item key="/admin/products" icon={<ShoppingOutlined />} onClick={() => handleLinkClick('/admin/products')}>
            <Link to="/admin/products">Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="/admin/detail" icon={<UnorderedListOutlined />} onClick={() => handleLinkClick('/admin/detail')}>
            <Link to="/admin/detail">Quản lý thuộc tính</Link>
          </Menu.Item>
          <Menu.Item key="/admin/brands" icon={<FlagOutlined />} onClick={() => handleLinkClick('/admin/brands')}>
            <Link to="/admin/brands">Quản lý nhãn hàng</Link>
          </Menu.Item>
          <Menu.Item key="/admin/categories" icon={<LaptopOutlined />} onClick={() => handleLinkClick('/admin/categories')}>
            <Link to="/admin/categories">Quản lý danh mục</Link>
          </Menu.Item>
          <Menu.Item key="/admin/users" icon={<UserOutlined />} onClick={() => handleLinkClick('/admin/users')}>
            <Link to="/admin/users">Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key="/admin/orders" icon={<ShoppingCartOutlined />} onClick={() => handleLinkClick('/admin/orders')}>
            <Link to="/admin/orders">Quản lý đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="/admin/review" icon={<CommentOutlined />} onClick={() => handleLinkClick('/admin/review')}>
            <Link to="/admin/review">Quản lý Đánh giá</Link>
          </Menu.Item>
          <Menu.Item key="/admin/blogs" icon={<FileTextOutlined />} onClick={() => handleLinkClick('/admin/blogs')}>
            <Link to="/admin/blogs">Quản lý blogs</Link>
          </Menu.Item>
          <Menu.Item key="/admin/feedback" icon={<FileTextOutlined />} onClick={() => handleLinkClick('/admin/feedback')}>
            <Link to="/admin/feedback">Phản hồi</Link>
          </Menu.Item>
          <Menu.Item key="/" icon={<HeartOutlined />} onClick={() => handleLinkClick('/')}>
            <Link to="/">Website</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 250 }}> 
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }}>
          <h1 className="text-[22px] font-bold text-qblack italic" style={{ marginLeft: '16px' }}>
            Bình An Store
          </h1>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;