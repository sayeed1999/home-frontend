import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "../constants/AppRoutes";
import { logout } from "../store/reducers/authReducer";
import Button from "./shared/Button";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Home", AppRoutes.Home, <HomeOutlined />),
  getItem("Newsfeed", AppRoutes.Newsfeed, <DesktopOutlined />),
  getItem("Cafe", AppRoutes.Cafe, <ContainerOutlined />),
  getItem("Rooms", AppRoutes.Chatroom, <AppstoreOutlined />),
  getItem("User & Role Management", "5", <UserOutlined />, [
    getItem("User", "9"),
    getItem("Role", "10"),
    getItem("Menu Permission", "11"),
  ]),
];

const AppDrawer = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItem = (item) => (
    <Menu.Item key={item.key} onClick={() => router.push(item.key)}>
      {item.label}
    </Menu.Item>
  );

  const subMenuItem = (item) => (
    <Menu.SubMenu key={item.key} title={item.label}>
      {item.children.map((child) => menuItem(child))}
    </Menu.SubMenu>
  );

  const appDrawer = (
    <Layout style={{ height: "100vh", overflowY: "hidden" }}>
      <Layout.Header>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => toggleCollapsed()}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          {!currentUser && (
            <Button
              type="link"
              size="large"
              onClick={() => router.push(AppRoutes.Signup)}
            >
              Signup
            </Button>
          )}
          {!currentUser && (
            <Button
              type="link"
              size="large"
              onClick={() => router.push(AppRoutes.Login)}
            >
              Login
            </Button>
          )}
          {currentUser && (
            <Button type="link" size="large" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          )}
        </Menu>
      </Layout.Header>
      <Layout.Content>
        <Layout style={{ height: "100%", overflowY: "hidden" }}>
          <Layout.Sider collapsed={collapsed}>
            <Menu mode="inline" theme="light">
              {items.map((item) =>
                item.children ? subMenuItem(item) : menuItem(item)
              )}
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            <Layout
              style={{ height: "100%", overflowY: "auto", padding: "5px" }}
            >
              {children}
            </Layout>
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );

  return <div>{appDrawer}</div>;
};

export default AppDrawer;
