'use client';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../loading';
import Box from '../components/_box/Box';

const Home = () => {

  return (
    <main>
    <section>
      <div className="w-full h-[700px] border bg-right bg-contain bg-no-repeat bg-[url(https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-cherry-blossom-tree-branch-with-blooming-flowers-png-image_11958836.png)]">
      
      <Box/>
      </div>
    </section>
  </main>
  )
}

export default Home