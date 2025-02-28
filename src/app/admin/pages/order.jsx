"use client";
import { Table, Select, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "@/redux/features/orderSlice";
import { useState } from "react";

const { Option } = Select;

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Statusu dəyişmək üçün funksiya
  const handleStatusChange = (orderId, status) => {
    setLoading(true);
    dispatch(updateOrderStatus({ orderId, status }));
    setLoading(false);
  };

  // Status üçün rənglər
  const statusColors = {
    pending: "orange",
    processing: "blue",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
  };

  // Cədvəl üçün sütunlar
  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Total Amount", dataIndex: "total", key: "total", render: (total) => `$${total}` },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status, record) => (
        <Select 
          defaultValue={status} 
          onChange={(value) => handleStatusChange(record.id, value)}
          loading={loading}
        >
          {Object.keys(statusColors).map((statusKey) => (
            <Option key={statusKey} value={statusKey}>
              <Tag color={statusColors[statusKey]}>{statusKey.toUpperCase()}</Tag>
            </Option>
          ))}
        </Select>
      )
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};

export default Orders;
