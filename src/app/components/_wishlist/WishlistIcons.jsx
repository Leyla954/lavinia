'use client';
import React, { useState } from 'react';
import { CloseOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '@/app/redux/features/wishlistSlice';
import { addToCart } from '@/app/redux/features/cartSlice';
import AuthModal from '@/app/components/authmodal/AuthModal';

const WishlistIcons = ({ item }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setModalVisible(true);
      return;
    }
    dispatch(addToCart(item));
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      setModalVisible(true);
      return;
    }
    dispatch(toggleWishlist(item));
  };

  return (
    <>
      <CloseOutlined onClick={handleWishlistClick} className='text-red-500 text-lg cursor-pointer hover:scale-110 transition-transform' />
      <ShoppingOutlined onClick={handleAddToCart} className='text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform' />
      <AuthModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default WishlistIcons;
