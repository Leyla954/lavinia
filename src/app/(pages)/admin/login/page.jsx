"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, message } from "antd";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiUrl = "https://67acc12c3f5a4e1477dbbfc0.mockapi.io/Users";

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.get(apiUrl);
      const adminUser = data.find(
        (user) => user.email === values.email && user.password === values.password && user.role === "admin"
      );
      
      if (adminUser) {
        localStorage.setItem("admin", JSON.stringify(adminUser));
        message.success("Login successful!");
        router.push("/admin");
      } else {
        message.error("Invalid email or password!");
      }
    } catch (error) {
      message.error("Login failed! Try again.");
    }
    setLoading(false);
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-5">Admin Login</h2>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter email!" }]}> 
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter password!" }]}> 
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>Login</Button>
        </Form>
      </div>
    </section>
  );
};

export default AdminLogin;
