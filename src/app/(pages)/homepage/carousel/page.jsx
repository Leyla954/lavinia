'use client';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import Link from 'next/link';

const FashionCarousel = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('carouselImages')) || [];
    setCategories(storedImages);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-7">
      <Carousel autoplay dots={false} arrows>
        {categories.map(({ src, label, link, textColor }, index) => (
          <div key={index} className="relative h-[600px] sm:h-[700px] flex items-center justify-center overflow-hidden">
            <Link href={link || "#"} className="block w-full h-full relative">
              <img src={src} alt={label} className="w-full h-full object-contain rounded-2xl shadow-lg cursor-pointer"/>
              <span className={`absolute top-1/2 right-10 transform -translate-y-1/2 ${textColor} text-6xl sm:text-8xl font-extrabold tracking-wider drop-shadow-2xl`} style={{ fontFamily: 'Chalkduster, Brush Script MT, cursive' }}>{label}</span>
            </Link>
          </div>
        ))}
      </Carousel>
      <style jsx>{`
        :global(.ant-carousel .slick-prev, .ant-carousel .slick-next) {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          transition: background 0.3s;
        }
        :global(.ant-carousel .slick-prev:hover, .ant-carousel .slick-next:hover) {
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
};

export default FashionCarousel;
