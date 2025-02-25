import React from 'react'

const page = () => {
  return (
    <section className='h-[550px] w-full bg-[82%] bg-contain object-cover bg-no-repeat bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgbyfm9UVPfjptSGHeTF4_gz9ItC67DS8inz3gm9WdCTQOJQ_ow2qFkSI-JXcwdlzgNE&usqp=CAU)]'>
      <div className='flex flex-col items-center'>
        <h1 className='text-xl my-3 font-serif font-bold'>Sign up</h1>
        <form action="" className='flex flex-col gap-4 p-7 px-11 w-full max-w-[550px] rounded-md bg-green-800'>
          <label htmlFor="name" className='text-green-600 font-bold'>Name</label>
          <input type="text" className='p-2 rounded-md' placeholder='Please enter your name' />

          <label htmlFor="surname" className='text-green-600 font-bold'>Surname</label>
          <input type="text" className='p-2 rounded-md' placeholder='Please enter your surname' />

          <label htmlFor="phone" className='text-green-600 font-bold'>Phone</label>
          <input type="number" className='p-2 rounded-md' placeholder='Please enter your phone' />

          <label htmlFor="email" className='text-green-600 font-bold'>Email</label>
          <input type="email" className='p-2 rounded-md' placeholder='Please enter your email' />

          <label htmlFor="password" className='text-green-600 font-bold'>Password</label>
          <input type="password" className='p-2 rounded-md' placeholder='Please enter your password' />

          <label htmlFor="confirm-password" className='text-green-600 font-bold'>Confirm password</label>
          <input type="password" className='p-2 rounded-md' placeholder='Please re-enter your password' />

          <button className='w-3/5 m-auto my-4 p-4 bg-green-600 hover:bg-green-500 rounded-md text-white'>Sign up</button>
        </form>
      </div>
    </section>
  )
}

export default page
