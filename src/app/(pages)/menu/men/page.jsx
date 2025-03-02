'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, FilterOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '@/app/redux/features/productSlice';
import Box from '@/app/components/_box/Box';

const MenPage = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProduct());
    }
  }, [dispatch, status]);

  useEffect(() => {
    let filtered = data.filter(item => item.gender === 'Men');
    if (selectedCategory) {
      filtered = filtered.filter(item => item.categories === selectedCategory);
    }
    if (selectedColors.length) {
      filtered = filtered.filter(item => selectedColors.includes(item.color));
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedColors, data]);

  const categories = ['Pencek', 'Salvar', 'Koynek'];
  const availableColors = selectedCategory 
    ? [...new Set(data.filter(item => item.categories === selectedCategory).map(item => item.color))] 
    : [...new Set(data.map(item => item.color))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedColors([]);
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedColors([]);
  };

  return (
    <div className="bg-[url('https://lifencolors.in/cdn/shop/files/4_057e949c-7fca-4a68-b453-8d16f439638b.webp?v=1726034492&width=1946')] bg-cover bg-fixed bg-center min-h-screen py-5 flex flex-col items-center bg-green-50 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-5 w-full max-w-2xl">
        <Input placeholder="Search for products..." prefix={<SearchOutlined />} className='shadow-lg shadow-green-500/80 border-none w-full sm:w-[400px] h-[35px]'/>
        <Button icon={<FilterOutlined />} onClick={() => setVisible(true)} className='text-sm py-4 px-6 shadow-lg shadow-green-500/80'>Filter</Button>
      </div>
      {visible && (
        <div className="fixed top-0 right-0 w-72 h-full bg-gradient-to-b from-green-100 to-white p-4 shadow-lg overflow-auto z-50 rounded-l-lg">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h3 className="text-gray-700 font-semibold italic">Filter</h3>
            <Button icon={<CloseOutlined />} onClick={() => setVisible(false)} className="text-gray-500 hover:text-black border-none shadow-lg shadow-green-500/80" />
          </div>
          <div className="mb-4">
            <h4 className="text-gray-700 font-semibold italic mb-2">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button 
                  key={category} 
                  className={`text-gray-700 italic border rounded-md px-3 py-1 text-sm transition-all ${
                    selectedCategory === category ? "bg-green-300" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gray-700 font-semibold italic mb-2">Color</h4>
            <div className="flex flex-wrap gap-2">
              {availableColors.map(color => (
                <button 
                  key={color} 
                  className={`text-gray-700 italic border rounded-md px-3 py-1 text-sm transition-all ${
                    selectedColors.includes(color) ? "bg-green-300" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleColorChange(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button type="primary" onClick={() => setVisible(false)} className="w-full italic text-black border-green-300 bg-green-200 shadow-lg shadow-green-500/80">Apply</Button>
            <Button onClick={resetFilters} className="w-full italic border-green-300 shadow-lg shadow-green-500/80">Reset</Button>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full">
        {filteredProducts.length > 0 ? <Box filteredData={filteredProducts} /> : <p className="text-center text-gray-500">Not Found</p>}
      </div>
    </div>
  );
};

export default MenPage;
