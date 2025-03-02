"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "@/app/redux/features/authSlice";
import * as Yup from "yup";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.get("https://67acc12c3f5a4e1477dbbfc0.mockapi.io/Users");
        const user = data.find(user => user.email === values.email && user.password === values.password);
        
        if (user) {
          dispatch(login(user));
          localStorage.setItem("user", JSON.stringify(user));
          router.push("/");
        } else {
          message.error("Invalid credentials!");
        }
      } catch (error) {
        message.error("An error occurred while logging in!");
      }
    }
  });

  return (
    <section className="flex flex-col items-center min-h-[70vh] p-4 bg-cover bg-no-repeat bg-[url('https://img.freepik.com/free-vector/watercolor-flowers-background-pastel-colors_79603-798.jpg')] bg-bottom">
      <h1 className="text-xl font-serif font-bold text-center mb-6">Login</h1>
      <div className="w-full max-w-md bg-green-800 rounded-lg shadow-lg p-6 sm:p-8">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <InputField type="email" name="email" label="Email" formik={formik} />
          <InputField type={showPassword ? "text" : "password"} name="password" label="Password" formik={formik} toggle={() => setShowPassword(!showPassword)} showPassword={showPassword} />
          <button type="submit" className="w-full p-3 bg-green-600 hover:bg-green-500 rounded-md text-white transition-all">Login</button>
        </form>
      </div>
    </section>
  );
};

const InputField = ({ type, name, label, formik, toggle, showPassword }) => (
  <div className="relative flex flex-col">
    <label className="text-green-300 font-bold">{label}</label>
    <div className="relative">
      <input type={type} name={name} className="p-2 rounded-md w-full pr-10 bg-white text-black outline-none focus:ring-2 focus:ring-green-400" placeholder={`Enter your ${label.toLowerCase()}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[name] || ""}/>
      {name === "password" && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-lg" onClick={toggle}>
          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      )}
    </div>
    {formik.touched[name] && formik.errors[name] && <span className="text-red-400 text-xs">{formik.errors[name]}</span>}
  </div>
);

export default LoginForm;
