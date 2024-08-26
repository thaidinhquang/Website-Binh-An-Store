import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, Avatar, Layout, Typography, Divider, Button } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LockOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { AuthContext } from "../Auth/core/Auth";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, removeCurrentUser } = useContext(AuthContext);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("");
  const [activeLink, setActiveLink] = useState("");

  const handleLogout = () => {
    if (confirmLogout) {
      removeCurrentUser();
      navigate("/?openform=true");
    } else {
      setConfirmLogout(true);
      setTimeout(() => {
        setConfirmLogout(false);
      }, 5000);
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(link); // Navigate to the clicked link
  };

  return (
    <Layout className="profile-page-wrapper w-full">
      <Sider width={300} className="site-layout-background" style={{ minHeight: '100vh' }}>
        
        <Menu
          mode="inline"
          selectedKeys={[activeLink]}
          onClick={({ key }) => handleLinkClick(key)}
        >

        <Divider />
        
       
        <div className="title-area w-full flex justify-center items-center py-4">
        <div className="flex flex-col items-center">
          <Avatar
            size={200}
            src={
              currentUser?.avatar ||
              "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
            }
            alt={currentUser?.name}
          />
          <div className="mt-2 text-center">
            <Title level={4}>{currentUser?.name}</Title>
            <Text type={currentUser?.active ? "success" : "danger"}>
              {currentUser?.active ? "Hoạt động" : "Không hoạt động"}
            </Text>
          </div>
        </div>
      </div>

 
      
        <Divider />
          {currentUser?.role === "admin" && (
            <Menu.Item key="/admin" icon={<DashboardOutlined />}>
              Admin Dashboard
            </Menu.Item>
          )}
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            Tài khoản của tôi
          </Menu.Item>
          <Menu.Item key="/profile/orders" icon={<ShoppingCartOutlined />}>
            Đơn mua
          </Menu.Item>
          <Menu.Item key="/profile/change-password" icon={<LockOutlined />}>
            Đổi mật khẩu
          </Menu.Item>
          <Divider />
          <Menu.Item key="" icon={<LogoutOutlined />} onClick={handleLogout}>
          {confirmLogout ? "Xác nhận" : "Đăng xuất"}
        </Menu.Item>
   
        
          <Divider />
        
          <Menu.Item key="spacer1" disabled>
            &nbsp;
          </Menu.Item>
          <Menu.Item key="spacer2" disabled>
            &nbsp;
          </Menu.Item>
          <Menu.Item key="spacer3" disabled>
            &nbsp;
          </Menu.Item>
          <Menu.Item key="spacer4" disabled>
            &nbsp;
          </Menu.Item>
          <Menu.Item key="spacer5" disabled>
            &nbsp;
          </Menu.Item>
          <Menu.Item key="spacer6" disabled>
            &nbsp;
          </Menu.Item>
          <Menu.Item key="spacer3" disabled>
          &nbsp;
        </Menu.Item>
        <Menu.Item key="spacer4" disabled>
          &nbsp;
        </Menu.Item>
        <Menu.Item key="spacer5" disabled>
          &nbsp;
        </Menu.Item>
        <Menu.Item key="spacer6" disabled>
          &nbsp;
        </Menu.Item> <Menu.Item key="spacer3" disabled>
        &nbsp;
      </Menu.Item>
      <Menu.Item key="spacer4" disabled>
        &nbsp;
      </Menu.Item>
      <Menu.Item key="spacer5" disabled>
        &nbsp;
      </Menu.Item>
      <Menu.Item key="spacer6" disabled>
        &nbsp;
      </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className="p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};