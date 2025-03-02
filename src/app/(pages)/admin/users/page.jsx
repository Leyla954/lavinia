"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const apiUrl = "https://67acc12c3f5a4e1477dbbfc0.mockapi.io/Users";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(apiUrl);
      setUsers(data);
    } catch (error) {
      message.error("Error loading users!");
    }
    setLoading(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      message.success("User deleted!");
    } catch (error) {
      message.error("Error deleting user!");
    }
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(`${apiUrl}/${editingUser.id}`, values);
      setUsers(users.map((user) => (user.id === data.id ? data : user)));
      setIsModalOpen(false);
      message.success("User updated successfully!");
    } catch (error) {
      message.error("Error updating user!");
    }
  };

  const columns = [
    { title: "First Name", dataIndex: "name", key: "name" },
    { title: "Last Name", dataIndex: "surname", key: "surname" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} className="border-blue-500 text-blue-500" />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <section className="w-full h-screen p-7 max-w-6xl mr-7 bg-cover bg-[url(https://opensenselabs.com/sites/default/files/inline-images/users.png)]">
      <h1 className=" p-7 text-center text-5xl font-semibold">Users</h1>
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="id" 
        loading={loading} 
        pagination={{ pageSize: 5 }} 
        className="overflow-x-auto bg-white m-7 rounded-xl shadow-lg shadow-green-500/80"
      />
      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical" className="">
          <Form.Item label="First Name" name="name" rules={[{ required: true, message: "Please enter first name!" }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="surname" rules={[{ required: true, message: "Please enter last name!" }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please enter phone number!" }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter email!" }]}> 
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter password!" }]}> 
            <Input.Password />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Save</Button>
          </div>
        </Form>
      </Modal>
    </section>
  );
};

export default UsersPage;
