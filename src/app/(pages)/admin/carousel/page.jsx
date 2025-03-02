'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';

const CarouselPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [shopLink, setShopLink] = useState('');
  const [carouselItems, setCarouselItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('carouselImages')) || [];
    setCarouselItems(storedImages);
  }, []);

  const getCategoryLabel = (link) => {
    if (link.includes('/menu/women')) return 'For Women';
    if (link.includes('/menu/men')) return 'For Men';
    if (link.includes('/menu/kids')) return 'For Kids';
    return 'Custom Image';
  };

  const saveCarouselItem = () => {
    if (!imageUrl.trim()) return alert('Şəkil linki boş ola bilməz!');

    const categoryLabel = getCategoryLabel(shopLink);
    let updatedImages;

    if (editIndex !== null) {
      updatedImages = [...carouselItems];
      updatedImages[editIndex] = { src: imageUrl, label: categoryLabel, link: shopLink };
      setEditIndex(null);
    } else {
      updatedImages = [...carouselItems, { src: imageUrl, label: categoryLabel, link: shopLink }];
    }

    localStorage.setItem('carouselImages', JSON.stringify(updatedImages));
    setCarouselItems(updatedImages);

    setImageUrl('');
    setShopLink('');
  };

  const deleteCarouselItem = (index) => {
    const updatedImages = carouselItems.filter((_, i) => i !== index);
    localStorage.setItem('carouselImages', JSON.stringify(updatedImages));
    setCarouselItems(updatedImages);
  };

  const editCarouselItem = (index) => {
    setImageUrl(carouselItems[index].src);
    setShopLink(carouselItems[index].link);
    setEditIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="shadow-lg shadow-green-500/100 rounded-xl p-8 w-full max-w-4xl text-center bg-cover bg-no-repeat bg-[url(https://img.freepik.com/free-photo/top-view-sewing-accesories-with-copy-space_23-2148586747.jpg)]">
        <h2 className="text-5xl font-bold text-gray-800 mb-8">Manage Carousel</h2>

        <label className="block text-gray-700 mb-2 text-lg">Image URL:</label>
        <Input
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mb-6 text-md w-3/4 mx-auto shadow-lg shadow-green-400/80"
        />

        <label className="block text-gray-700 mb-2 text-lg">Shop Page Link:</label>
        <Input
          placeholder="Enter shop page link (e.g., /menu/women)"
          value={shopLink}
          onChange={(e) => setShopLink(e.target.value)}
          className="mb-6 text-md w-3/4 mx-auto shadow-lg shadow-green-400/80"
        />

        <Button
          type="primary"
          onClick={saveCarouselItem}
          className="w-1/2 text-lg text-black bg-green-50 shadow-lg shadow-green-600/100 hover:bg-green-100 transition-all"
        >
          {editIndex !== null ? 'Update Carousel Item' : 'Save Carousel Item'}
        </Button>
      </div>
      <div className="w-full max-w-4xl mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {carouselItems.map((item, index) => (
            <div key={index} className="relative p-4 border rounded-xl shadow-md bg-white">
              <div className="relative w-full h-40">
                <img src={item.src} alt={`Carousel ${index}`} className="w-full h-full object-cover rounded-md" />
                <span className="absolute top-2 left-2 text-white px-3 py-1 rounded-md text-sm font-semibold bg-transparent">
                  {item.label}
                </span>

              </div>
              <div className="mt-3">
                <p className="text-gray-700 font-semibold mb-2">Link: <a href={item.link} target="_blank" className="text-blue-500">{item.link}</a></p>
                <div className="flex justify-between">
                  <Button
                    type="default"
                    className="text-sm text-white bg-green-500 px-4 py-2 rounded-md"
                    onClick={() => editCarouselItem(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="default"
                    className="text-sm text-white bg-red-500 px-4 py-2 rounded-md"
                    onClick={() => deleteCarouselItem(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;
