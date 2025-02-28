import Box from '@/app/components/_box/Box';

const Wishlist = () => (
  <div className="px-4 sm:px-6 md:px-8 bg-fixed bg-no-repeat bg-cover bg-[url(https://wallpapersok.com/images/hd/cute-pastel-colors-heart-shapes-r8egnnf87azn99sv.jpg)]">
    <h2 className="text-center text-3xl sm:text-4xl font-bold my-4">Favorite products</h2>
    <Box wishlistPage={true} />
  </div>
);

export default Wishlist;
