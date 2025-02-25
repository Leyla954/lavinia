import React from 'react'

const page = () => {
  return (
    <section className="h-[550px] sm:h-[400px] md:h-[500px] lg:h-[550px] w-full bg-contain object-cover bg-no-repeat bg-[url('https://files.ecommercedns.uk/231423/3ef155cdbc4291b907e11eda1abb7dd6.png')]">
      <div className='flex flex-col items-center py-7'>
  <h1 className='text-xl my-3 font-serif font-bold'>Login</h1>
  <form action="" className='flex flex-col gap-1 p-7 px-11 w-full max-w-[550px] h-[280px] rounded-md bg-green-800'>
    <label htmlFor="email" className='text-green-600 font-bold'>Email</label>
    <input type="email" className='p-2 rounded-md' placeholder='Please enter your email' />

    <label htmlFor="password" className='text-green-600 font-bold'>Password</label>
    <input type="password" className='p-2 rounded-md' placeholder='Please enter your password' />

    <button className='w-3/5 m-auto my-4 p-4 bg-green-600 hover:bg-green-500 rounded-md text-white'>Login</button>
  </form>
</div>

    </section>
  );
};

export default page;
