"use client";
import React from "react";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="py-8 bg-cover bg-center bg-[url(https://t3.ftcdn.net/jpg/02/14/94/78/360_F_214947872_0buOruh9TiFyu9S3BT1sH6Bhvj6R2v0s.jpg)]">
      <div className="max-w-5xl m-auto flex flex-col md:flex-row flex-wrap items-start justify-between text-center md:text-left">
        <div className="mb-6 md:mb-0 w-full md:w-1/4">
          <h2 className="text-4xl font-bold italic text-black">Lavinia</h2>
          <p className="text-lg mt-2 max-w-xs italic text-black">
            The best choices in the world of fashion. Your style, our inspiration.
          </p>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold italic text-black mb-3">Quick Links</h3>
          <ul className="text-base space-y-1">
            <li><a href="/shop" className="hover:text-green-400 italic text-black">Shop</a></li>
            <li><a href="/wishlist" className="hover:text-green-400 italic text-black">Wishlist</a></li>
            <li><a href="/cart" className="hover:text-green-400 italic text-black">Cart</a></li>
            <li><a href="/contact" className="hover:text-green-400 italic text-black">Contact</a></li>
            <li><a href="/about" className="hover:text-green-400 italic text-black">About Us</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold italic text-black mb-3">Services</h3>
          <ul className="text-base space-y-1">
            <li><a href="#" className="hover:text-green-400 italic text-black">Delivery</a></li>
            <li><a href="#" className="hover:text-green-400 italic text-black">Returns</a></li>
            <li><a href="#" className="hover:text-green-400 italic text-black">Customer Service</a></li>
            <li><a href="#" className="hover:text-green-400 italic text-black">Security</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold italic text-black mb-3">Contact</h3>
          <p className="text-base italic text-black">Email: info@lavinia.com</p>
          <p className="text-base italic text-black">Phone: +994 50 123 45 67</p>
          <p className="text-base italic text-black">Address: Baku, Azerbaijan</p>
        </div>
      </div>
      <div className="flex space-x-4 my-6 w-full justify-center">
        <a href="#" className="text-black hover:text-white text-3xl p-2"><FacebookOutlined /></a>
        <a href="#" className="text-black hover:text-white text-3xl p-2"><InstagramOutlined /></a>
        <a href="#" className="text-black hover:text-white text-3xl p-2"><TwitterOutlined /></a>
        <a href="#" className="text-black hover:text-white text-3xl p-2"><YoutubeOutlined /></a>
        <a href="#" className="text-black hover:text-white text-3xl p-2"><LinkedinOutlined /></a>
      </div>
      <div className="text-center text-base border-t border-gray-700 pt-3 italic text-black">
        &copy; {new Date().getFullYear()} Lavinia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
