'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '@/app/components/cart/CartItem';

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);

  return (
    <div className='px-4 sm:px-6 md:px-8 container mx-auto p-6'>
      <h1 className="text-3xl font-bold mb-6 text-center">Shop</h1>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cart.map((item) => <CartItem key={item.id} item={item} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500">Empty basket</p>
      )}
    </div>
  );
};

export default CartPage;
