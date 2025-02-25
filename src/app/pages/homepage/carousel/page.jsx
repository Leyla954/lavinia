'use client';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  // Modal açılma funksiyası
  const showModal = (images) => {
    setCurrentImages(images);
    setIsModalOpen(true); // Modal açılır
  };

  // Modal bağlanma funksiyası
  const closeModal = () => {
    setIsModalOpen(false); // Modal bağlanır
    setCurrentImages([]); // Şəkilləri sıfırlayır
  };

  // Kateqoriyaları filtr etmək
  const categories = [
    { id: 1, images: ['https://via.placeholder.com/500', 'https://via.placeholder.com/600'], category: 'Dress' },
    { id: 2, images: ['https://via.placeholder.com/700', 'https://via.placeholder.com/800'], category: 'Pants' },
    { id: 3, images: ['https://via.placeholder.com/900', 'https://via.placeholder.com/1000'], category: 'Skirt' },
    { id: 4, images: ['https://via.placeholder.com/1100', 'https://via.placeholder.com/1200'], category: 'Bodysuit' }
  ];

  // Kateqoriya adının olub-olmamasını yoxlayırıq
  const filteredCategories = categories.filter(category => 
    category.category && ['dress', 'pants', 'skirt', 'bodysuit'].includes(category.category.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Kateqoriyaların siyahısı */}
      <div className="grid grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="text-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <h2 className="text-xl">{category.category}</h2>
            <img
              src={category.images[0]} // İlk şəkli göstəririk
              alt={category.category}
              className="w-32 h-32 object-cover rounded-lg cursor-pointer"
              onClick={() => showModal(category.images)} // Modalı açırıq
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen} // `open` istifadə olunur
        onCancel={closeModal}
        footer={null}
        width={800}
        className="relative"
      >
        <Button
          onClick={closeModal}
          className="absolute top-0 right-0 p-2 text-xl"
        >
          X
        </Button>
        <div className="space-x-4">
          {currentImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image-${index}`}
              className="w-80 h-auto rounded-lg shadow-lg"
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Page;
