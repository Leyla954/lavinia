"use client";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addNotification, removeNotification } from "@/redux/features/notificationSlice";
import { useState } from "react";

const Notifications = () => {
  const notifications = useSelector((state) => state.notification.notifications);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Yeni bildiriş əlavə etmək üçün funksiya
  const handleAddNotification = (values) => {
    const newNotification = {
      id: Date.now(),
      message: values.message,
      date: new Date().toLocaleString(),
    };
    dispatch(addNotification(newNotification));
    message.success("Notification added successfully!");
    setIsModalOpen(false);
    form.resetFields();
  };

  // Bildirişi silmək üçün funksiya
  const handleDelete = (id) => {
    dispatch(removeNotification(id));
    message.warning("Notification deleted.");
  };

  // Cədvəl üçün sütunlar
  const columns = [
    { title: "Message", dataIndex: "message", key: "message" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notification Management</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)} className="mb-4">
        Add Notification
      </Button>
      <Table dataSource={notifications} columns={columns} rowKey="id" />

      {/* Bildiriş əlavə etmək üçün Modal */}
      <Modal
        title="Add New Notification"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddNotification} layout="vertical">
          <Form.Item name="message" label="Notification Message" rules={[{ required: true, message: "Please enter a message" }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Notifications;
