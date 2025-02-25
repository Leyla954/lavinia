"use client";
import { useState } from "react";
import Carousel from "../carousel/page";
import StepForm from "../stepForm/form/page";
import Box from "@/app/components/_box/Box";

const Home = () => {
  const [showStepForm, setShowStepForm] = useState(false);

  return (
    <main>
      <section>
        <div className="w-full h-full p-4 sm:p-7 bg-right bg-contain bg-no-repeat bg-fixed bg-transparent bg-[url(https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-cherry-blossom-tree-branch-with-blooming-flowers-png-image_11958836.png)] flex flex-col items-center">
          <Carousel />
          {!showStepForm && (
            <img
              src="https://www.moodfabrics.com/media/StaticPageImages/20.png"
              alt="Open Step Form"
              className="cursor-pointer mt-5 w-[60%] sm:w-[40%] max-w-full h-auto"
              onClick={() => setShowStepForm(true)}
            />
          )}
          {showStepForm && (
            <div className="m-7 w-full">
              <StepForm onClose={() => setShowStepForm(false)} />
            </div>
          )}
          
        </div>
      </section>
    </main>
  );
};

export default Home;
