'use client';
import React from 'react';
import { CloseOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { toggleWishlist } from '@/app/redux/features/wishlistSlice';
import { addToCart } from '@/app/redux/features/cartSlice';

const WishlistIcons = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart(item));
    alert('Added to cart!');
  };


 const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleWishlistClick = () => {
    dispatch(toggleWishlist(product));
    showAlert(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist', isInWishlist ? 'warning' : 'success');
  };
  return (
    <>
    {/* {alertMessage && (
        <div className="fixed top-5 right-5 z-50">
          <Alert 
            message={alertMessage} 
            type={alertType} 
            showIcon 
            className="shadow-lg rounded-lg text-sm"
            style={{ 
              width: 250, 
              padding: '10px 15px', 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #e0f7ff, #f0faff)', // Mavi-ağ gradient fon
              color: '#004080', // Daha yumşaq mavi ton
              border: '1px solid #b3d9ff',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      )} */}
      <CloseOutlined onClick={() => dispatch(toggleWishlist(item))} className='text-red-500 text-lg cursor-pointer hover:scale-110 transition-transform' />
      <ShoppingOutlined onClick={handleAddToCart} className='text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform' />
    </>
  );
};

export default WishlistIcons;
