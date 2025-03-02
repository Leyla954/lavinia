'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Modal, Spin, Carousel } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDessing } from '@/app/redux/features/dessingSlice';

const Page = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.dessing);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchDessing());
  }, [status, dispatch]);

  const categoryImages = {
    dress: "https://www.moodfabrics.com/blog/wp-content/uploads/Classic-Barbershop-Logo.png",
    pants: "https://www.moodfabrics.com/blog/wp-content/uploads/Classic-Barbershop-Logo-8.png",
    skirt: "https://www.moodfabrics.com/blog/wp-content/uploads/Classic-Barbershop-Logo-3.png",
    bodysuit: "https://www.moodfabrics.com/blog/wp-content/uploads/Classic-Barbershop-Logo-9.png"
  };

  const categoryHeaders = {
    dress: "https://www.moodfabrics.com/blog/wp-content/uploads/Dress-Patterns.png",
    pants: "https://www.moodfabrics.com/blog/wp-content/uploads/Dress-Patterns-2.png",
    skirt: "https://www.moodfabrics.com/blog/wp-content/uploads/Dress-Patterns-3.png",
    bodysuit: "https://www.moodfabrics.com/blog/wp-content/uploads/Dress-Patterns-4.png"
  };

  const filteredCategories = useMemo(() =>
    data.filter(category => category.category && ['dress', 'pants', 'skirt', 'bodysuit'].includes(category.category.toLowerCase())),
  [data]);

  if (status === 'loading') return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
  if (status === 'failed') return <div className="text-red-500 text-center font-semibold">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-[url('https://static.vecteezy.com/system/resources/previews/008/680/979/non_2x/floral-with-watercolor-pastel-background-free-vector.jpg')]"><div className="mb-6">
        <img src="https://www.moodfabrics.com/blog/wp-content/uploads/Shop-New-Products-Website-Banner-Brown-White-Tan.png" alt="Banner" className="m-auto sm:h-40 object-cover rounded-lg" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(categoryImages).map((category) => (
          <div key={category} className="text-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer" onClick={() => setSelectedCategory(category)}>
            <img src={categoryImages[category]} alt={category} className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-md" />
          </div>
        ))}
      </div>
      
      {selectedCategory && (
        <div className="mt-6 p-4 sm:p-6 bg-white rounded-lg relative">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={() => setSelectedCategory(null)}>
            <CloseOutlined className="text-xl" />
          </button>
          <img src={categoryHeaders[selectedCategory]} alt={selectedCategory} className="m-auto sm:h-32 object-cover rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
            {filteredCategories
              .filter(item => item.category.toLowerCase() === selectedCategory)
              .map(item => (
                <div key={item.id} className="text-center m-auto" onClick={() => setSelectedItem(item)}>
                  {item.image?.length > 0 ? (
                    <img src={item.image[0]} alt={selectedCategory} className="mt-7 sm:h-48 object-cover cursor-pointer" />
                  ) : (
                    <div className="w-full h-32 sm:h-48 flex items-center justify-center bg-gray-300 rounded-lg">No Image</div>
                  )}
                </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && selectedItem.image.length > 1 && (
        <Modal
          open={!!selectedItem}
          onCancel={() => setSelectedItem(null)}
          footer={null}
        >
          <Carousel autoplay>
            {selectedItem.image.filter((_, index) => index !== 0).map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Slide ${index}`} className="w-full sm:h-96 object-contain rounded-lg" />
              </div>
            ))}
          </Carousel>
        </Modal>
      )}
    </div>
  );
};

export default Page;
