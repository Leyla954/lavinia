"use client";
import React from "react";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 bg-cover bg-center bg-[url(https://t3.ftcdn.net/jpg/02/14/94/78/360_F_214947872_0buOruh9TiFyu9S3BT1sH6Bhvj6R2v0s.jpg)]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Fashion Store</h2>
          <p className="text-sm text-gray-200">Sizin üçün ən yaxşı dəb məhsulları.</p>
        </div>
        <div className="flex space-x-6 my-4 md:my-0">
          <a href="#" className="text-gray-300 hover:text-white text-2xl"><FacebookOutlined /></a>
          <a href="#" className="text-gray-300 hover:text-white text-2xl"><InstagramOutlined /></a>
          <a href="#" className="text-gray-300 hover:text-white text-2xl"><TwitterOutlined /></a>
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-200">&copy; {new Date().getFullYear()} Fashion Store. Bütün hüquqlar qorunur.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
