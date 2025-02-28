'use client';
import React, { useState } from 'react';
import { HeartOutlined, HeartFilled, ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '@/app/redux/features/wishlistSlice';
import { addToCart } from '@/app/redux/features/cartSlice';
import AuthModal from '@/app/components/authmodal/AuthModal';

const ShopIcons = ({ item }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isInWishlist = wishlist.some((w) => w.id === item.id);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setModalVisible(true);
      return;
    }
    dispatch(addToCart(item));
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      setModalVisible(true);
      return;
    }
    dispatch(toggleWishlist(item));
  };

  return (
    <>
      <span onClick={handleWishlistToggle} className='cursor-pointer text-lg'>
        {isInWishlist ? (
          <HeartFilled className='text-red-500 hover:scale-110 transition-transform' />
        ) : (
          <HeartOutlined className='text-gray-500 hover:scale-110 transition-transform' />
        )}
      </span>
      <ShoppingOutlined onClick={handleAddToCart} className='text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform' />
      <AuthModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default ShopIcons;
