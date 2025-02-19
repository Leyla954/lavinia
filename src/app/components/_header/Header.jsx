import { SearchOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import Link from 'next/link';


const Header = () => {
  
  return (
    <header className='bg-transparent'>
      <div className="container bg-transparent font-serif font-bold flex justify-around">
        <div className="flex h-[70px] cursor-pointer">
          <img src="https://static.vecteezy.com/system/resources/previews/041/933/675/non_2x/ai-generated-silhouette-women-isolated-on-transparent-background-free-png.png" alt="" />
          <h1 className='text-5xl py-5'>Lavinia</h1>
        </div>
        <div className=' py-7'>
          <ul className='flex gap-7 font-bold'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/pages/menu/women">Women</Link></li>
            <li><Link href="/pages/menu/men">Men</Link></li>
            <li><Link href="/pages/menu/kids">Kids</Link></li>
            <li><Link href="/pages/menu/desing">Desing</Link></li>
            <li><Link href="/pages/wishlist"><HeartOutlined className='text-red-500 text-lg hover:scale-110 transition-transform' /> <sub>0</sub></Link></li>
            <li><Link href="/pages/addtocard"><ShoppingOutlined className='text-blue-500 text-lg hover:scale-110 transition-transform' /> <sub>0</sub></Link></li>
            <li><Link href="/pages/log-in/login">Login</Link></li>
            <li><Link href="/pages/log-in/signup">Sign up</Link></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header