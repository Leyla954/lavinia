"use client";
import React from "react";
import Link from "next/link";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="py-6 bg-cover bg-center bg-[url(https://t3.ftcdn.net/jpg/02/14/94/78/360_F_214947872_0buOruh9TiFyu9S3BT1sH6Bhvj6R2v0s.jpg)]">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold italic text-black">Lavinia</h2>
          <p className="text-sm mt-2 max-w-xs italic text-black">
            The best choices in the world of fashion. Your style, our inspiration.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold italic text-black mb-3">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li><Link href="/shop" className="hover:text-green-400 italic text-black">Shop</Link></li>
            <li><Link href="/wishlist" className="hover:text-green-400 italic text-black">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-green-400 italic text-black">Cart</Link></li>
            <li><Link href="/contact" className="hover:text-green-400 italic text-black">Contact</Link></li>
            <li><Link href="/about" className="hover:text-green-400 italic text-black">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold italic text-black mb-3">Services</h3>
          <ul className="text-sm space-y-1">
            <li><Link href="#" className="hover:text-green-400 italic text-black">Delivery</Link></li>
            <li><Link href="#" className="hover:text-green-400 italic text-black">Returns</Link></li>
            <li><Link href="#" className="hover:text-green-400 italic text-black">Customer Service</Link></li>
            <li><Link href="#" className="hover:text-green-400 italic text-black">Security</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold italic text-black mb-3">Contact</h3>
          <p className="text-sm italic text-black">Email: info@lavinia.com</p>
          <p className="text-sm italic text-black">Phone: +994 50 123 45 67</p>
          <p className="text-sm italic text-black">Address: Baku, Azerbaijan</p>
        </div>
      </div>
      <div className="flex justify-center space-x-4 my-6">
        <Link href="#" className="text-black hover:text-white text-2xl p-2"><FacebookOutlined /></Link>
        <Link href="#" className="text-black hover:text-white text-2xl p-2"><InstagramOutlined /></Link>
        <Link href="#" className="text-black hover:text-white text-2xl p-2"><TwitterOutlined /></Link>
        <Link href="#" className="text-black hover:text-white text-2xl p-2"><YoutubeOutlined /></Link>
        <Link href="#" className="text-black hover:text-white text-2xl p-2"><LinkedinOutlined /></Link>
      </div>
      <div className="text-center text-sm border-t border-gray-700 pt-3 italic text-black">
        &copy; {new Date().getFullYear()} Lavinia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
