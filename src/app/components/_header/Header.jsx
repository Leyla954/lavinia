import React from 'react';
import { DownOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';

const categories = [
  { label: "Women", key: "women", href: "/pages/menu/women" },
  { label: "Men", key: "men", href: "/pages/menu/men" },
  { label: "Kids", key: "kids", href: "/pages/menu/kids" }
];

const items = categories.map(category => ({
  key: category.key,
  label: <div className='p-7 block hover:bg-[rgb(249,238,226)] transition'><Link href={category.href}>{category.label}</Link></div>
}));

const Header = () => (
  <header className='bg-transparent'>
    <div className="container bg-transparent font-serif font-bold flex justify-around">
      <div className="flex h-[70px] cursor-pointer">
        <img src="https://static.vecteezy.com/system/resources/previews/041/933/675/non_2x/ai-generated-silhouette-women-isolated-on-transparent-background-free-png.png" alt="" />
        <h1 className='text-5xl py-5'>Lavinia</h1>
      </div>
      <div className='py-7'>
        <ul className='flex gap-7 font-bold'>
          <li className='p-3 rounded-2xl hover:bg-[rgb(249,238,226)] transition'><Link href="/">Home</Link></li>
          <li className='p-3 rounded-2xl hover:bg-[rgb(249,238,226)] transition'>
            <Dropdown menu={{ items }} trigger={['hover']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Shop
                </Space>
              </a>
            </Dropdown>
          </li>
          <li className='p-3 rounded-2xl hover:bg-[rgb(249,238,226)] transition'><Link href="/pages/menu/desing">Desing</Link></li>
          <li className='py-3 rounded-2xl'><Link href="/pages/icons/wishlist"><HeartOutlined className='text-red-500 text-lg hover:scale-110 transition-transform' /> <sub>0</sub></Link></li>
          <li className='py-3 rounded-2xl'><Link href="/pages/icons/addCart"><ShoppingOutlined className='text-blue-500 text-lg hover:scale-110 transition-transform' /> <sub>0</sub></Link></li>
          <li className='p-3 rounded-2xl hover:bg-[rgb(249,238,226)] transition'><Link href="/pages/log-in/login">Login</Link></li>
          <li className='p-3 rounded-2xl hover:bg-[rgb(249,238,226)] transition'><Link href="/pages/log-in/signup">Sign up</Link></li>
        </ul>
      </div>
    </div>
  </header>
);

export default Header;
