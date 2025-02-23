'use client';
import React, { useState } from 'react';
import { HeartOutlined, HeartFilled, ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '@/app/redux/features/wishlistSlice';
import { addToCart } from '@/app/redux/features/cartSlice';
import { setNotification } from '@/app/components/_notification/Notification';

const ShopIcons = ({ item }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((w) => w.id === item.id);

  const [alertMessage, setAlertMessage] = useState(null); // alertMessage state
  const [alertType, setAlertType] = useState(null); // alertType state

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    setAlertMessage('Added to cart!');
    setAlertType('success');
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <>
      

      <span onClick={() => dispatch(toggleWishlist(item))} className='cursor-pointer text-lg'>
        {isInWishlist ? (
          <HeartFilled className='text-red-500 hover:scale-110 transition-transform' />
        ) : (
          <HeartOutlined className='text-gray-500 hover:scale-110 transition-transform' />
        )}
      </span>

      <ShoppingOutlined onClick={handleAddToCart} className='text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform' />
    </>
  );
};

export default ShopIcons;