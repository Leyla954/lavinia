'use client';

import React, { useEffect, useState } from 'react';
import { CloseOutlined, ShoppingOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '@/app/redux/features/productSlice';
import { toggleWishlist } from '@/app/redux/features/wishlistSlice';
import { addToCart } from '@/app/redux/features/cartSlice';
import Link from 'next/link';

const Box = ({ wishlistPage = false, shopPage = false }) => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);
  const wishlist = useSelector((state) => state.wishlist.items);
  const [visibleCount, setVisibleCount] = useState(4);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Yüklənir...</div>;
  }

  if (status === 'failed') {
    return <div>Xəta baş verdi!</div>;
  }

  // Əgər wishlist səhifəsindədirsə, yalnız seçilmiş məhsulları göstər
  const filteredData = wishlistPage ? wishlist : data;

  const handleAddToCart = (item) => {
    const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

    if (isInCart) {
      alert('Mehsul artıq səbətdədir!');
    } else {
      dispatch(addToCart(item));
      alert(`${item.title} səbətə əlavə olundu!`);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className={`m-auto grid gap-6 p-4 place-items-center ${filteredData.length === 1 ? 'grid-cols-1' : filteredData.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} justify-center`}> 
        {filteredData.length > 0 ? (
          filteredData.slice(0, visibleCount).map((item) => {
            const isInWishlist = wishlist.some((w) => w.id === item.id);

            return (
              <div key={item.id}
                className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105 flex flex-col justify-between p-4 h-auto w-[200px]'>
                <div className='relative group flex flex-colitems-center'>
                  <img src={item.image} alt={item.title} className='w-[120px] h-[120px] object-contain' />
                  
                  {/* İkonlar */}
                  <div className='absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    {wishlistPage ? (
                      // Wishlist səhifəsində -> Close və Səbətə əlavə et
                      <>
                        <CloseOutlined
                          onClick={() => dispatch(toggleWishlist(item))}
                          className='text-red-500 text-lg cursor-pointer hover:scale-110 transition-transform'
                        />
                        <ShoppingOutlined
                          onClick={() => handleAddToCart(item)}
                          className='text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform'
                        />
                      </>
                    ) : (
                      // Əsas səhifədə -> Ürək və Səbətə əlavə et
                      <>
                        <span onClick={() => dispatch(toggleWishlist(item))} className='cursor-pointer text-lg'>
                          {isInWishlist ? (
                            <HeartFilled className='text-red-500 hover:scale-110 transition-transform' />
                          ) : (
                            <HeartOutlined className='text-gray-500 hover:scale-110 transition-transform' />
                          )}
                        </span>
                        <ShoppingOutlined
                          onClick={() => handleAddToCart(item)}
                          className='text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform'
                        />
                      </>
                    )}
                  </div>
                </div>
                
                <div className='text-center mt-3'>
                  <p className='text-gray-700 font-semibold text-sm'>{item.title}</p>
                  <p className='text-purple-600 font-semibold text-lg'>{item.price} AZN</p>
                  <Link href={`/${item.id}`}>
                    <button className="mt-2 bg-green-600 text-white text-m py-2 px-4 rounded-lg hover:bg-green-500 transition w-full">Detail</button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">Seçilmiş məhsul yoxdur.</p>
        )}
      </div>

      {!wishlistPage && visibleCount < data.length && (
        <button onClick={() => setVisibleCount(visibleCount + 4)} className='mt-4 bg-gray-800 text-white text-lg px-7 py-3 rounded-lg hover:bg-gray-900 transition'>Daha Çox Məhsul</button>
      )}
    </div>
  );
};

export default Box;
