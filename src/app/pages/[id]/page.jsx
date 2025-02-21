'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Rate } from 'antd';

const Detail = () => {
  const { id } = useParams();
  const { data } = useSelector((state) => state.counter);
  const product = data?.find((item) => item.id === Number(id));
  const [rating, setRating] = useState(product?.rating || 0);

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-10"
      style={{
        backgroundImage: "url('https://t4.ftcdn.net/jpg/06/85/04/69/360_F_685046926_YH4QcgjcNCryfhPffCVMBb5qMXUHDBgh.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 flex max-w-4xl w-full">
        <img
          src={product.image}
          alt={product.title}
          className="w-1/2 h-auto object-cover rounded-lg"
        />
        <div className="w-1/2 pl-6 flex flex-col justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold text-purple-600 mt-4">{product.price} AZN</p>
          <div className="mt-4">
            <Rate value={rating} onChange={setRating} allowHalf />
            <p className="text-gray-700 mt-2">Overall Rating: {rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
