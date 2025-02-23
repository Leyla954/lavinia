'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/app/redux/features/cartSlice';
import { toggleWishlist } from '@/app/redux/features/wishlistSlice';
import { CloseOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  return (
    <div className='container mx-auto p-6'>
      <h1 className="text-3xl font-bold mb-6 text-center">Səbət</h1>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cart.map((item) => {
            const isInWishlist = wishlist.some((w) => w.id === item.id);

            return (
              <div key={item.id} className="relative bg-white shadow-md rounded-lg p-6 flex items-center gap-6 w-[400px]">
                {/* X və Ürək ikonları */}
                <div className="absolute top-2 right-2 flex gap-3">
                  <span
                    onClick={() => dispatch(toggleWishlist(item))}
                    className="cursor-pointer text-xl"
                  >
                    {isInWishlist ? (
                      <HeartFilled className="text-red-500 hover:scale-110 transition-transform" />
                    ) : (
                      <HeartOutlined className="text-gray-500 hover:text-red-500 transition" />
                    )}
                  </span>

                  <CloseOutlined
                    onClick={() => dispatch(removeFromCart(item))}
                    className="text-gray-500 text-lg cursor-pointer hover:text-red-500 transition"
                  />
                </div>

                <img src={item.image} alt={item.title} className="w-[140px] h-[140px] object-contain rounded-lg" />
                
                <div className='flex flex-col flex-grow'>
                  <p className="text-gray-700 font-semibold text-base">{item.title}</p>
                  
                  {/* Məhsul kateqoriyası */}
                  <p className="text-blue-600 font-medium text-sm">{item.category}</p>

                  <p className="text-purple-600 font-bold text-xl">{item.price} AZN</p>

                  {/* Sayı artırıb-azaltma */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item))}
                      className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition"
                    >-</button>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item))}
                      className="bg-green-500 text-white px-2 py-1 rounded-md text-sm hover:bg-green-600 transition"
                    >+</button>
                  </div>

                  {/* Ümumi qiymət (Total) */}
                  <p className="mt-3 text-gray-900 font-bold text-lg">
                    Total: {(item.price * item.quantity).toFixed(2)} AZN
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Səbət boşdur.</p>
      )}
    </div>
  );
};

export default CartPage;
