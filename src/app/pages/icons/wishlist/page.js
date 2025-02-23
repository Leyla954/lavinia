import Box from '@/app/components/_box/Box';

const Wishlist = () => (
  <div>
    <h2 className="text-center text-2xl font-bold my-4">Favorite products</h2>
    <Box wishlistPage={true} />
  </div>
);

export default Wishlist;
