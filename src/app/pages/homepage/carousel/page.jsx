import React from 'react'
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {

  const router = useRouter();

  const images = [
    { src: "https://img.freepik.com/psd-premium/modelo-de-banner-de-moda-de-tendencia-psd-premium_641545-41.jpg?w=1380", link: "/pages/menu/women" },
    { src: "https://img.freepik.com/vetores-premium/modelo-de-banner-de-moda-masculina-psd-com-cor-premium_758367-28.jpg?w=740", link: "/pages/menu/men" },
    { src: "https://i.pinimg.com/736x/58/ff/54/58ff5415588a7729cdcc9ffe67e827d4.jpg", link: "/pages/menu/kids" },
  ];


  return (
    <section>
        <div className="w-full max-w-5xl mt-10">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="rounded-2xl shadow-lg">
              {images.map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={item.src}alt={`Fashion ${index + 1}`} className="w-full h-[600px] object-cover rounded-2xl cursor-pointer" onClick={() => router.push(item.link)}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
    </section>
  )
}

export default Carousel