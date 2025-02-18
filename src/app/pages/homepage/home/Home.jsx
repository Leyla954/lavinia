"use client";
import { useRouter } from "next/navigation";
import Carousel from "../carousel/page";
import StepForm from "../_stepForm/form/page";
import Box from "@/app/components/_box/Box";

const Home = () => {
 
  return (
    <main>
      <section>
        <div className="w-full h-full p-7 bg-right bg-contain bg-no-repeat bg-fixed bg-[url(https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-cherry-blossom-tree-branch-with-blooming-flowers-png-image_11958836.png)] flex flex-col items-center">
          <Carousel />
          <StepForm />
          <Box />
        </div>
      </section>
    </main>
  );
};

export default Home;
