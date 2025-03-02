'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '@/app/redux/features/productSlice';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import WishlistIcons from '@/app/components/_wishlist/WishlistIcons';
import ShopIcons from '@/app/components/shop/ShopIcons';
import { syncWishlistWithLocalStorage } from '@/app/redux/features/wishlistSlice';
import Link from 'next/link';

const Box = ({ wishlistPage = false, shopPage = false, filteredData = [] }) => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.items);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(syncWishlistWithLocalStorage()); 
  }, [dispatch]);

  if (status === 'loading') {
    return <div><Loading /></div>;
  }

  if (status === 'failed') {
    return <div><NotFound /></div>;
  }

  const displayedData = wishlistPage ? wishlist : (filteredData.length > 0 ? filteredData : data);

  return (
    <div className='flex flex-col items-center'>
      {displayedData.length === 0 ? (
        wishlistPage ? (
          <div className="text-center text-gray-600 text-lg mt-6">
            Empty wishlist
          </div>
        ) : (
          <NotFound />
        )
      ) : (
        <>
          <div className={`m-auto grid gap-6 p-4 items-center justify-center ${displayedData.length === 1 ? 'grid-cols-1'
              : displayedData.length === 2 ? 'grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
            {displayedData.slice(0, visibleCount).map((item) => (
              <div key={item.id} className='bg-white shadow-xl shadow-green-500/80 rounded-lg overflow-hidden hover:shadow-green-700/100 transition duration-300 transform hover:scale-105 flex flex-col justify-between p-4 h-auto'>
                <div className='relative group flex flex-col items-center'>
                  <img src={item.image} alt={item.title} className='w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] object-contain transition-all' />
                  <div className='absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    {wishlistPage ? (
                      <WishlistIcons item={item} />
                    ) : (
                      <ShopIcons item={item} />
                    )}
                  </div>
                </div>
                <div className='text-center mt-3'>
                  <p className='text-gray-700 font-semibold text-sm'>{item.title}</p>
                  <p className='text-blue-600 font-semibold text-lg'>{item.price} AZN</p>
                  <Link href={`/${item.id}`}>
                    <button className="mt-2 text-m bg-green-100 py-2 px-4 rounded-lg shadow-lg shadow-green-500/80 hover:shadow-green-700/100 transition w-full">Detail</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {!wishlistPage && visibleCount < displayedData.length && (
            <button
              onClick={() => setVisibleCount(visibleCount + 4)}
              className='mt-4 bg-gray-800 text-white text-lg px-7 py-3 rounded-lg hover:bg-gray-900 transition'>
              More products
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Box;