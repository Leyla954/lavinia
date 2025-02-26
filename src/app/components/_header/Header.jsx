"use client";
import React, { useState } from "react";
import { DownOutlined, HeartOutlined, ShoppingOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/redux/features/authSlice";

const categories = [
  { label: "Women", key: "women", href: "/pages/menu/women" },
  { label: "Men", key: "men", href: "/pages/menu/men" },
  { label: "Kids", key: "kids", href: "/pages/menu/kids" }
];

const items = categories.map(category => ({
  key: category.key,
  label: (
    <Link href={category.href} className="block px-4 py-2 transition-all duration-300 hover:text-green-500">
      {category.label}
    </Link>
  )
}));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="bg-white shadow-lg shadow-green-300/50 top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-6 md:px-12 lg:px-16">
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://static.vecteezy.com/system/resources/previews/041/933/675/non_2x/ai-generated-silhouette-women-isolated-on-transparent-background-free-png.png"
            alt="Logo"
            className="h-20 md:h-24"
          />
          <h1 className="text-4xl md:text-6xl font-serif italic text-gray-800 tracking-wide">Lavinia</h1>
          {user && <span className="text-lg font-medium text-green-600 ml-4">{user.name}</span>}
        </div>

        <nav className="hidden lg:flex items-center space-x-6 md:space-x-8 text-base md:text-lg font-serif italic">
          <Link href="/" className="relative transition duration-300 hover:text-green-600 group">
            Home
            <span className="absolute top-7 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
          </Link>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <span className="flex items-center gap-1 transition duration-300 hover:text-green-600 relative group cursor-pointer">
              <Space>Shop <DownOutlined /></Space>
              <span className="absolute top-7 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
            </span>
          </Dropdown>
          <Link href="/pages/menu/desing" className="relative transition duration-300 hover:text-green-600 group">
            Design
            <span className="absolute top-7 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
          </Link>
          {user ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md transition">
              Logout
            </button>
          ) : (
            <>
              <Link href="/pages/log-in/login" className="relative transition duration-300 hover:text-green-600 group">
                Login
                <span className="absolute top-7 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
              <Link href="/pages/log-in/signup" className="relative transition duration-300 hover:text-green-600 group">
                Sign up
                <span className="absolute top-7 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </>
          )}
          <Link href="/pages/icons/wishlist" className="relative text-xl md:text-2xl hover:text-red-500 transition-transform">
            <HeartOutlined />
          </Link>
          <Link href="/pages/icons/addCart" className="relative text-xl md:text-2xl hover:text-blue-500 transition-transform">
            <ShoppingOutlined />
          </Link>
        </nav>

        <div className="lg:hidden flex items-center">
          <MenuOutlined className="text-3xl cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-5 gap-4 text-base md:text-lg font-serif italic">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <span className="hover:text-green-600 cursor-pointer">
              <Space>Shop <DownOutlined /></Space>
            </span>
          </Dropdown>
          <Link href="/pages/menu/desing" className="hover:text-green-600">Design</Link>
          {user ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md transition">
              Logout
            </button>
          ) : (
            <>
              <Link href="/pages/log-in/login" className="hover:text-green-600">Login</Link>
              <Link href="/pages/log-in/signup" className="hover:text-green-600">Sign up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
