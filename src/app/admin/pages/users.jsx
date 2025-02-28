"use client";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser } from "@/redux/features/authSlice";
import { useState } from "react";

const { Option } = Select;

const Users = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // İstifadəçi redaktəsi üçün modal açılır
  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setVisible(true);
  };

  // Redaktə edilmiş məlumatları Redux-a göndər
  const handleSave = () => {
    form.validateFields().then((values) => {
      dispatch(updateUser({ id: editingUser.id, ...values }));
      setVisible(false);
    });
  };

  // İstifadəçini silmək
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  // Cədvəl üçün sütunlar
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Select>
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
