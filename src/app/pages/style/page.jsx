'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDessing } from '../../redux/features/dessingSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Page = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.dessing);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDessing());
    }
  }, [status, dispatch]);

  // Filter the data to include only specific categories
  const filteredCategories = data.filter(category =>
    ['dress', 'pants', 'skirt', 'bodysuit'].includes(category.name.toLowerCase())
  );

  const showModal = (images) => {
    setCurrentImages(images);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentImages([]);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="text-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            {/* Show only one image per category */}
            <img
              src={category.images[0]} // Assume 'images' is an array in each category
              alt={category.name}
              className="w-full h-48 object-cover rounded-lg cursor-pointer shadow-md"
              onClick={() => showModal(category.images)} // Show modal with all images of the category
            />
          </div>
        ))}
      </div>

      {/* Modal for showing the images */}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={closeModal}
        width={800}
        className="relative"
      >
        <Button
          icon={<CloseOutlined />}
          onClick={closeModal}
          className="absolute top-0 right-0 p-2 z-10 text-white bg-black rounded-full"
        />
        <Swiper
          spaceBetween={10} // Space between slides
          slidesPerView={1} // Show 1 image at a time
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {currentImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`image-${index}`} className="w-full h-auto rounded-lg" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </div>
  );
};

export default Page;
