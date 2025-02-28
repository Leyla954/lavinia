"use client";
import React from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/redux/features/authSlice";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const AdminHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const userMenu = {
    items: [
      {
        key: "logout",
        label: "Logout",
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Header className="bg-white shadow-md flex justify-between items-center px-6">
      <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>

      <Dropdown menu={userMenu} trigger={["click"]}>
        <div className="cursor-pointer flex items-center space-x-2">
          <Avatar size="large" icon={<UserOutlined />} />
          <span className="font-semibold text-gray-700">{user?.name || "Admin"}</span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AdminHeader;
