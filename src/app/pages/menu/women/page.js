'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Drawer, Checkbox } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '@/app/redux/features/productSlice';
import Box from '@/app/components/_box/Box';

const WomenPage = () => {
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
    let filtered = data;
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    if (selectedColors.length) {
      filtered = filtered.filter(item => selectedColors.includes(item.color));
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedColors, data]);

  const categories = ['Pencek', 'Salvar', 'Don', 'Etek', 'Koynek', 'Bluz', 'Kardiqan', 'Sviter', 'Palto'];
  const availableColors = selectedCategory 
    ? [...new Set(data.filter(item => item.category === selectedCategory).map(item => item.color))] 
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
    <div className="container py-5">
      <div className="flex justify-center gap-4 items-center mb-5">
        <Input
          placeholder="Search for products..."
          prefix={<SearchOutlined />}
          style={{ width: '400px', fontSize: '18px', border: '3px solid rgb(249,238,226)' }}
        />
        <Button
          icon={<FilterOutlined />}
          onClick={() => setVisible(true)}
          style={{ fontSize: '14px', padding: '18px 25px', border: '2px solid rgb(249,238,226)', backgroundColor: 'rgb(249,238,226)' }}
        >
          Filter
        </Button>
      </div>

      <Drawer title="Filters" placement="right" onClose={() => setVisible(false)} open={visible} width={300}>
        <h3>Category</h3>
        <div className="flex flex-col gap-2">
          {categories.map(category => (
            <Checkbox key={category} checked={selectedCategory === category} onChange={() => handleCategoryChange(category)}>
              {category}
            </Checkbox>
          ))}
        </div>

        <h3 className="mt-4">Color</h3>
        <div className="flex flex-col gap-2">
          {availableColors.map(color => (
            <Checkbox key={color} checked={selectedColors.includes(color)} onChange={() => handleColorChange(color)}>
              {color}
            </Checkbox>
          ))}
        </div>

        <Button type="primary" onClick={() => setVisible(false)} className="mt-4 w-full">Search</Button>
        <Button onClick={resetFilters} className="mt-2 w-full">Reset</Button>
      </Drawer>

      {filteredProducts.length > 0 ? <Box data={filteredProducts} /> : <p className="text-center text-gray-500">Not Found</p>}
    </div>
  );
};

export default WomenPage;
