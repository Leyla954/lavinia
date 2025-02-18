import Box from '@/app/components/_box/Box'
import React from 'react'

const page = () => {

  const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
  
    useEffect(() => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(storedWishlist);
    }, []);
  
    const removeFromWishlist = (id) => {
      const updatedWishlist = wishlist.filter((item) => item.id !== id);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

  return (
   <Box/>
  )
}}

export default page