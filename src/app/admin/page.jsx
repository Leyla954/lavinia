"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "@/app/redux/features/usersSlice";
import { fetchOrders } from "@/app/redux/features/orderSlice";
import { Card, Statistic, Row, Col, Table } from "antd";
import { ShoppingCartOutlined, UserOutlined, BellOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const dispatch = useDispatch(); // ✅ dispatch təyin edildi
  const users = useSelector((state) => state.users?.data || []);
  const orders = useSelector((state) => state.orders?.data || []);

  useEffect(() => {
    dispatch(fetchUsers()); // ✅ `fetchUsers` çağırılır
    dispatch(fetchOrders()); // ✅ `fetchOrders` çağırılır
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Row gutter={16} className="mt-4">
        <Col span={8}>
          <Card>
            <Statistic title="Total Users" value={users.length} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Orders" value={orders.length} prefix={<ShoppingCartOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Notifications" value={5} prefix={<BellOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
