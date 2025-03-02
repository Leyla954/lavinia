"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { validationSchema } from "./utils/validationSchema";
import axios from "axios";
import { message } from "antd";

const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema.signup,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.get("https://67acc12c3f5a4e1477dbbfc0.mockapi.io/Users");
        const existingUser = data.find(user => user.email === values.email);
        if (existingUser) {
          return message.error("Bu email artıq qeydiyyatdan keçib!");
        }
        await axios.post("https://67acc12c3f5a4e1477dbbfc0.mockapi.io/Users", values);
        message.success("Qeydiyyat uğurla tamamlandı!");
        setTimeout(() => router.push("/log-in/login"), 1000);
      } catch (error) {
        message.error("Qeydiyyat zamanı xəta baş verdi!");
      }
    },
  });

  return (
    <section className="size-full my-7 bg-[89%] bg-contain object-cover bg-no-repeat bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgbyfm9UVPfjptSGHeTF4_gz9ItC67DS8inz3gm9WdCTQOJQ_ow2qFkSI-JXcwdlzgNE&usqp=CAU)]">
      <div className="flex flex-col items-center">
        <h1 className="text-xl my-3 font-serif font-bold">Sign up</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-7 px-11 w-full max-w-[550px] rounded-md bg-green-800">
          {["name", "surname"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-green-600 font-bold capitalize">{field}</label>
              <input type="text" name={field} className="p-2 rounded-md" placeholder={`Please enter your ${field}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[field]}/>
              {formik.touched[field] && formik.errors[field] && (
                <span className="text-red-400 text-xs">{formik.errors[field]}</span>
              )}
            </div>
          ))}
          {["phone", "email"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-green-600 font-bold capitalize">{field}</label>
              <input type={field === "email" ? "email" : "text"} name={field} className="p-2 rounded-md" placeholder={`Please enter your ${field}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[field]}/>
              {formik.touched[field] && formik.errors[field] && (
                <span className="text-red-400 text-xs">{formik.errors[field]}</span>
              )}
            </div>
          ))}
          {[{ name: "password", show: showPassword, toggle: togglePasswordVisibility },
            { name: "confirmPassword", show: showConfirmPassword, toggle: toggleConfirmPasswordVisibility }
          ].map(({ name, show, toggle }) => (
            <div key={name} className="relative flex flex-col">
              <label className="text-green-600 font-bold">{name === "confirmPassword" ? "Confirm Password" : "Password"}</label>
              <div className="relative">
                <input type={show ? "text" : "password"} name={name} className="p-2 rounded-md w-full pr-10" placeholder={`Please enter your ${name === "confirmPassword" ? "password again" : "password"}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[name]}/>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-lg" onClick={toggle}>
                  {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              {formik.touched[name] && formik.errors[name] && (
                <span className="text-red-400 text-xs">{formik.errors[name]}</span>
              )}
            </div>
          ))}
          <button type="submit" className="w-3/5 m-auto my-4 p-4 bg-green-600 hover:bg-green-500 rounded-md text-white">Sign up</button>
          <p className="text-white text-center mt-3">Already have an account?{" "}
            <span className="text-white cursor-pointer hover:underline" onClick={() => router.push("/log-in/login")}>Log in</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
