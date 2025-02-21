'use client';
import React, { useEffect, useState } from 'react';
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '@/app/redux/features/productSlice';
import { addToWishlist } from '@/app/redux/features/wishlistSlice';
import { addToCart } from '@/app/redux/features/cartSlice';
import Link from 'next/link';

const Box = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-red-500">Error fetching products.</div>;
  }

  const wishlist = (item) => {
    dispatch(addToWishlist(item));
  };

  const addCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='m-auto grid lg:grid-cols-4 gap-6 p-4'>
        {data.slice(0, visibleCount).map((item) => (
          <div key={item.id}
            className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105 flex flex-col justify-between p-4 h-auto w-[200px]'>
            <div className='relative group flex flex-col items-center'>
              <img src={item.image} alt={item.title} className='w-[120px] h-[120px] object-contain' />
              <div className='absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <HeartOutlined onClick={() => wishlist(item)} className='text-red-500 text-lg cursor-pointer hover:scale-110 transition-transform'/>
                <ShoppingOutlined onClick={() => addCart(item)} className='text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform'/>
              </div>
            </div>
            <div className='text-center mt-3'>
              <p className='text-gray-700 font-semibold text-sm'>{item.title}</p>
              <p className='text-purple-600 font-semibold text-lg'>{item.price} AZN</p>
              <Link href={`/pages/${item.id}`}>
                <button className="mt-2 bg-green-600 text-white text-m py-2 px-4 rounded-lg hover:bg-green-500 transition w-full">Detail</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < data.length && (
        <button onClick={() => setVisibleCount(visibleCount + 4)} className='mt-4 bg-gray-800 text-white text-lg px-7 py-3 rounded-lg hover:bg-gray-900 transition'>More Products</button>
      )}
    </div>
  );
};

export default Box;
