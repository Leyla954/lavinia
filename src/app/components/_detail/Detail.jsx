import React, { useState, useEffect } from 'react';
import { HeartFilled, HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Alert } from 'antd'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import NotFound from '@/app/not-found';
import Loading from '@/app/loading';
import StarRating from '../_rating/starRating';
import { toggleWishlist } from '../../redux/features/wishlistSlice';
import { addToCart, removeFromCart } from '../../redux/features/cartSlice';

const DetailPage = () => {
  const { id } = useParams();
  const productId = decodeURIComponent(id);
  
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.items);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://67acb9903f5a4e1477dba29c.mockapi.io/dress/${productId}`);
        if (!res.ok) throw new Error(`Failed to fetch product with ID: ${productId}`);
        
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <Loading />;
  if (error) return <NotFound />;

  const isInWishlist = wishlist.some((item) => item.id === product?.id);
  const isInCart = cart.some((item) => item.id === product?.id);

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleWishlistClick = () => {
    dispatch(toggleWishlist(product));
    showAlert(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist', isInWishlist ? 'warning' : 'success');
  };

  const handleCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product));
      showAlert('Removed from cart', 'warning');
    } else {
      dispatch(addToCart(product));
      showAlert('Added to cart', 'success');
    }
  };

  return (
    <div className="h-[500px] flex items-center justify-center bg-[url(https://t4.ftcdn.net/jpg/11/04/71/65/360_F_1104716585_VJK8pWVuFAyi6BHgZektW1EyR5ktyYrD.jpg)] bg-cover bg-top pt-10">
      
      {alertMessage && (
        <div className="fixed top-5 right-5 z-50">
          <Alert 
            message={alertMessage} 
            type={alertType} 
            showIcon 
            className="shadow-lg rounded-lg text-sm"
            style={{ 
              width: 250, 
              padding: '10px 15px', 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #e0f7ff, #f0faff)', // Mavi-ağ gradient fon
              color: '#004080', // Daha yumşaq mavi ton
              border: '1px solid #b3d9ff',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      )}

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
            {/* Wishlist Icon */}
            {isInWishlist ? (
              <HeartFilled 
                onClick={handleWishlistClick}
                className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition-transform"
              />
            ) : (
              <HeartOutlined 
                onClick={handleWishlistClick}
                className="text-gray-500 text-2xl cursor-pointer hover:text-red-500 hover:scale-110 transition-transform"
              />
            )}

            {/* Cart Icon */}
            <ShoppingOutlined 
              onClick={handleCartClick}
              className={`text-2xl cursor-pointer hover:scale-110 transition-transform ${
                isInCart ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
