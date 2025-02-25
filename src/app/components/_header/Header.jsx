'use client';
import React, { useState } from 'react';
import { DownOutlined, HeartOutlined, ShoppingOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';

const categories = [
  { label: "Women", key: "women", href: "/pages/menu/women" },
  { label: "Men", key: "men", href: "/pages/menu/men" },
  { label: "Kids", key: "kids", href: "/pages/menu/kids" }
];

const items = categories.map(category => ({
  key: category.key,
  label: <div className='py-2 px-6 hover:text-green-600 bg-transparent transition duration-200 ease-in-out'>
    <Link href={category.href} className="relative">{category.label}
      <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:text-green-500 transition-all duration-800"></span>
    </Link>
  </div>
}));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className='bg-transparent'>
      <div className="container m-auto font-serif font-bold flex justify-around  items-center px-2 py-5 shadow-lg shadow-green-500/80 ">
        <div className="flex items-center gap-3 cursor-pointer">
          <img src="https://static.vecteezy.com/system/resources/previews/041/933/675/non_2x/ai-generated-silhouette-women-isolated-on-transparent-background-free-png.png" alt="Logo" className="h-12" />
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 group relative'>Lavinia</h1>
        </div>
        <div className="lg:hidden flex items-center gap-4">
          <MenuOutlined className="text-3xl text-gray-800 cursor-pointer hover:text-green-600 transition duration-200 ease-in-out" onClick={toggleMenu} />
        </div>
        <div className='hidden lg:flex items-center gap-7'>
          <ul className='flex gap-7 font-bold'>
            <li className='group relative p-3 rounded-2xl hover:text-green-600 transition duration-200 ease-in-out'>
              <Link href="/" className="relative">Home
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative p-3 rounded-2xl hover:text-green-600 transition duration-200 ease-in-out'>
              <Dropdown menu={{ items }} trigger={['hover']}>
                <a onClick={(e) => e.preventDefault()} className="relative">
                  <Space>Shop <DownOutlined />
                    <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
                  </Space>
                </a>
              </Dropdown>
            </li>
            <li className='group relative p-3 rounded-2xl hover:text-green-600 transition duration-200 ease-in-out'>
              <Link href="/pages/menu/desing" className="relative">Design
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative py-3 rounded-2xl'>
              <Link href="/pages/icons/wishlist" className="relative">
                <HeartOutlined className='text-red-500 text-lg hover:scale-110 transition-transform' />
                <sub>0</sub>
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:text-red-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative py-3 rounded-2xl'>
              <Link href="/pages/icons/addCart" className="relative">
                <ShoppingOutlined className='text-blue-500 text-lg hover:scale-110 transition-transform' />
                <sub>0</sub>
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:text-blue-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative p-3 rounded-2xl hover:text-green-600 transition duration-200 ease-in-out'>
              <Link href="/pages/log-in/login" className="relative">Login
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative p-3 rounded-2xl hover:text-green-600 transition duration-200 ease-in-out'>
              <Link href="/pages/log-in/signup" className="relative">Sign up
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 z-20 transition-all ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex justify-end p-6">
            <MenuOutlined className="text-3xl text-gray-800 cursor-pointer hover:text-green-600 transition duration-200 ease-in-out" onClick={toggleMenu} />
          </div>
          <ul className="flex flex-col items-center gap-6 py-10">
            <li className='group relative p-3'>
              <Link href="/" className="relative">Home
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative p-3'>
              <Dropdown menu={{ items }} trigger={['hover']}>
                <a onClick={(e) => e.preventDefault()} className="relative">
                  <Space>Shop <DownOutlined />
                    <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
                  </Space>
                </a>
              </Dropdown>
            </li>
            <li className='group relative p-3'>
              <Link href="/pages/menu/desing" className="relative">Design
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative py-3'>
              <Link href="/pages/icons/wishlist" className="relative">
                <HeartOutlined className='text-red-500 text-lg' />
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:text-red-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative py-3'>
              <Link href="/pages/icons/addCart" className="relative">
                <ShoppingOutlined className='text-blue-500 text-lg' />
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:text-blue-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative p-3'>
              <Link href="/pages/log-in/login" className="relative">Login
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </li>
            <li className='group relative p-3'>
              <Link href="/pages/log-in/signup" className="relative">Sign up
                <span className="absolute top-6 left-3/4 transform -translate-x-3/4 w-0 h-0.5 bg-transparent group-hover:w-full group-hover:bg-green-500 transition-all duration-800"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
