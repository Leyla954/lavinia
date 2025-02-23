import Box from "@/app/components/_box/Box";

const Wishlist = () => {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold my-4">Seçilmiş Məhsullar</h2>
      <Box wishlistPage={true} />
    </div>
  );
};

export default Wishlist;
