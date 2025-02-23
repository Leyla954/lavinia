import React, { useState, useEffect } from 'react';
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import NotFound from '@/app/not-found';
import Loading from '@/app/loading';
import StarRating from '../_rating/starRating';
import { addToWishlist } from '../../redux/features/wishlistSlice';
import { addToCart } from '../../redux/features/cartSlice';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (!id) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product with ID: ${id}`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleWishlistClick = () => {
    dispatch(addToWishlist(product));
    // İstifadəçini başqa bir səhifəyə yönləndirmək istəsəniz, burada yönləndirmə kodunu əlavə edin
  };

  if (loading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div className="h-[500px] flex items-center justify-center bg-[url(https://t4.ftcdn.net/jpg/11/04/71/65/360_F_1104716585_VJK8pWVuFAyi6BHgZektW1EyR5ktyYrD.jpg)] bg-cover bg-top pt-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl flex flex-col md:flex-row p-6 gap-6">
        <div className="md:w-1/2 flex justify-center">
          <img src={product?.image} alt={product?.title} className="w-full max-w-xs object-contain" />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-xl font-bold">{product?.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{product?.price} AZN</p>
          <p className="text-sm text-gray-500 mt-2">{product?.description}</p>

          <div className="flex items-center mt-3">
            <StarRating rating={userRating} onRatingChange={setUserRating} />
            <span className="ml-2 text-gray-700">{product?.rating?.rate} / 5</span>
            <span className="ml-2 text-gray-500">({product?.rating?.count} reviews)</span>
          </div>

          <div className="flex gap-4 mt-4">
            <HeartOutlined
              onClick={handleWishlistClick}
              className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition-transform"
            />
            <ShoppingOutlined
              onClick={() => dispatch(addToCart(product))}
              className="text-blue-500 text-2xl cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
