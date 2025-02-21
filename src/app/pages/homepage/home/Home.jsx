"use client";
import { useState } from "react";
import Carousel from "../carousel/page";
import StepForm from "../_stepForm/form/page";
import Box from "@/app/components/_box/Box";

const Home = () => {
  const [showStepForm, setShowStepForm] = useState(false);

  return (
    <main>
      <section>
        <div className="w-full h-full p-7 bg-right bg-contain bg-no-repeat bg-fixed bg-transparent bg-[url(https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-cherry-blossom-tree-branch-with-blooming-flowers-png-image_11958836.png)] flex flex-col items-center">
          <Carousel />
          {!showStepForm && (
            <img src="https://www.moodfabrics.com/media/StaticPageImages/20.png" alt="Open Step Form" className="cursor-pointer mt-5 w-[40%]" onClick={() => setShowStepForm(true)}/>
          )}
          {showStepForm && (
            <div className="m-7">
              <StepForm onClose={() => setShowStepForm(false)} />
            </div>
          )}
          <div className="shadow-2xl p-4">
          <Box />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
