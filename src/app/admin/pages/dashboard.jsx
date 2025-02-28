"use client";
import { useSelector } from "react-redux";
import { Card } from "antd";

const Dashboard = () => {
  const products = useSelector((state) => state.product.products);
  const users = useSelector((state) => state.auth.users);
  const orders = useSelector((state) => state.cart.orders);

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Total Products" bordered={false}>{products.length}</Card>
      <Card title="Total Users" bordered={false}>{users.length}</Card>
      <Card title="Total Orders" bordered={false}>{orders.length}</Card>
    </div>
  );
};

export default Dashboard;
