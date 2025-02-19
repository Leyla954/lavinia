'use client';
import React, { useEffect, useState } from 'react';
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '@/app/redux/features/productSlice';
import { addToWishlist } from '@/app/redux/features/wishlistSlice';
import Link from 'next/link';

const Box = () => {
  const { data } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const wishlist = (item) => {
    dispatch(addToWishlist(item));
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='m-auto grid lg:grid-cols-4 gap-6 p-4'>
        {data?.slice(0, visibleCount).map((item) => (
          <div key={item.id}
            className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105 flex flex-col justify-between p-4 h-auto w-[200px]'>
            <div className='relative group flex flex-col items-center'>
              <img src={item.image} alt={item.title} className='w-[120px] h-[120px] object-contain' />
              <div className='absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <HeartOutlined onClick={() => wishlist(item)} className='text-red-500 text-lg cursor-pointer hover:scale-110 transition-transform'/>
                <ShoppingOutlined onClick={() => AddCart(item)} className='text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform'/>
                </div>
            </div>
            <div className='text-center mt-3'>
              <p className='text-gray-700 font-semibold text-sm'>{item.title}</p>
              <p className='text-green-600 font-semibold text-lg'>{item.price} AZN</p>
              <button className='mt-2 bg-blue-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full'>
                <Link href={`/pages/${item.id}`}>Detail</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {visibleCount < data?.length && (
        <button
          onClick={() => setVisibleCount(visibleCount + 4)}
          className='mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition'
        >
          More Products
        </button>
      )}
    </div>
  );
};

export default Box;
