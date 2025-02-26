import { Carousel } from 'antd';
import Link from 'next/link';

const categories = [
  { src: 'https://img.freepik.com/premium-photo/elegant-woman-orange-gown-with-ruffles-flowing-fabric_1346134-5800.jpg?w=1800', label: 'For women', link: '/pages/menu/women', textColor: 'text-white' },
  { src: 'https://nicolebaas.com/wp-content/uploads/2018/03/Kit-and-Ace-boston-mens-activewear-editorial-photographer-1003.jpg', label: 'For men', link: '/pages/menu/men', textColor: 'text-white' },
  { src: 'https://images.squarespace-cdn.com/content/v1/5bf07da11aef1de706d5b257/79484c84-ba4f-4e15-bba9-61648f2994ac/All-Saints-Childrens-Fashion-Photographer-Simon-Songhurst-Kids-Fashion-Photography-03.jpg', label: 'For kids', link: '/pages/menu/kids', textColor: 'text-white' },
  { src: 'https://cdn.shopify.com/s/files/1/0355/1805/files/kids-editorial-3.jpg?v=1592943001', label: 'For women', link: '/pages/menu/women', textColor: 'text-white' },
  { src: 'https://candicelamarandphotography.com/wp-content/uploads/sites/5014/2014/03/family-7053-1.jpg', label: 'For men', link: '/pages/menu/men', textColor: 'text-white' },
  { src: 'https://juniorstyle.net/wp/wp-content/uploads/2018/04/ed-colour-condition/editorial_cindy_james_colour_condition_manuela_kids_design-featured-image-1-570x380.jpg', label: 'For kids', link: '/pages/menu/kids', textColor: 'text-white' },
  { src: 'https://img.freepik.com/premium-photo/elegant-woman-coral-pink-flowing-dress_1346134-6113.jpg', label: 'For women', link: '/pages/menu/women', textColor: 'text-white' },
  { src: 'https://isabelscharenberg.com/sites/default/files/styles/gallery_full/public/2019-05/Andreas_Ortner_Elle_Men_Fashion_Editorial_03.jpg?itok=YWH73emu', label: 'For men', link: '/pages/menu/men', textColor: 'text-white' },
  { src: 'https://highendbeautyretouching.com/blog/images/gallery/news_preview2_90.jpg', label: 'For kids', link: '/pages/menu/kids', textColor: 'text-white' },

];

const FashionCarousel = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-7">
      <Carousel autoplay dots={false} arrows>
        {categories.map(({ src, label, link, textColor }, index) => (
          <div key={index} className="relative h-[600px] sm:h-[700px] flex items-center justify-center overflow-hidden">
            <Link href={link} className="block w-full h-full relative">
              <img
                src={src}
                alt={label}
                className="w-full h-full object-cover rounded-2xl shadow-lg cursor-pointer"
              />
              <span className={`absolute top-1/2 right-10 transform -translate-y-1/2 ${textColor} text-6xl sm:text-8xl font-extrabold tracking-wider drop-shadow-2xl`} style={{ fontFamily: 'Chalkduster, Brush Script MT, cursive' }}>
                {label}
              </span>
            </Link>
          </div>
        ))}
      </Carousel>
      <style jsx>{`
        :global(.ant-carousel .slick-prev, .ant-carousel .slick-next) {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          transition: background 0.3s;
        }
        :global(.ant-carousel .slick-prev:hover, .ant-carousel .slick-next:hover) {
          background: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
};

export default FashionCarousel;
