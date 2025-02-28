"use client";
import { Menu } from "antd";
import { DashboardOutlined, ShoppingCartOutlined, UserOutlined, BellOutlined } from "@ant-design/icons";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold text-center mb-6">Admin</h2>
      <Menu theme="dark" mode="vertical" className="bg-gray-800">
        <Menu.Item icon={<DashboardOutlined />}>
          <Link href="/admin/pages/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item icon={<ShoppingCartOutlined />}>
          <Link href="/admin/pages/products">Products</Link>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined />}>
          <Link href="/admin/pages/users">Users</Link>
        </Menu.Item>
        <Menu.Item icon={<BellOutlined />}>
          <Link href="/admin/pages/notifications">Notifications</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
