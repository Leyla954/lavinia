'use client';
import React, { useState } from 'react';
import { CloseOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '@/app/redux/features/wishlistSlice';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/app/redux/features/cartSlice';
import AuthModal from '@/app/components/authmodal/AuthModal';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isInWishlist = wishlist.some((w) => w.id === item.id);
  const [modalVisible, setModalVisible] = useState(false);

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      setModalVisible(true);
      return;
    }
    dispatch(toggleWishlist(item));
  };

  return (
    <div className="relative bg-white shadow-lg shadow-green-500/80 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-[400px]">
      <div className="absolute top-2 right-2 flex gap-3">
        <span onClick={handleWishlistToggle} className="cursor-pointer text-xl">
          {isInWishlist ? (
            <HeartFilled className="text-red-500 hover:scale-110 transition-transform" />
          ) : (
            <HeartOutlined className="text-gray-500 hover:text-red-500 transition" />
          )}
        </span>
        <CloseOutlined 
          onClick={() => dispatch(removeFromCart(item.id))} 
          className="text-gray-500 text-lg cursor-pointer hover:text-red-500 transition" 
        />
      </div>
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-[140px] h-[140px] object-contain rounded-lg sm:mr-4 mb-4 sm:mb-0" 
      />
      <div className="flex flex-col flex-grow">
        <p className="text-gray-700 font-semibold text-base">{item.title}</p>
        <p className="text-blue-600 font-medium text-sm">{item.category}</p>
        <p className="text-purple-600 font-bold text-xl">{item.price} AZN</p>
        <div className="flex items-center gap-3 mt-3">
          <button 
            onClick={() => item.quantity > 1 && dispatch(decreaseQuantity(item.id))} 
            disabled={item.quantity === 1}
            className={`shadow-lg shadow-red-600/100 text-black bg-red-50 px-3 py-1 rounded-md text-sm transition ${
              item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-100'
            }`}
          >
            -
          </button>
          <span className="text-lg font-bold">{item.quantity}</span>
          <button 
            onClick={() => dispatch(increaseQuantity(item.id))} 
            className="shadow-lg shadow-green-600/100 bg-green-50 px-3 py-1 rounded-md text-sm hover:bg-green-100 transition"
          >
            +
          </button>
        </div>
        <p className="mt-3 text-gray-900 font-bold text-lg">
          Total: {(item.price * item.quantity).toFixed(2)} AZN
        </p>
      </div>
      <AuthModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default CartItem;
