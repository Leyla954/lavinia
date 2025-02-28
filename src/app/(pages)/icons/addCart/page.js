'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '@/app/components/cart/CartItem';

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);

  return (
    <div className='min-h-screen px-4 sm:px-6 md:px-8 mx-auto p-6 bg-fixed bg-no-repeat bg-cover bg-center bg-[url(https://img.freepik.com/premium-vector/display-shopping-carts-with-black-mouse-laptop-with-discount-tags-beige-background_1174726-9277.jpg)]'>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Shop</h1>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {cart.map((item) => <CartItem key={item.id} item={item} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg sm:text-xl">Empty basket</p>
      )}
    </div>
  );
};

export default CartPage;
