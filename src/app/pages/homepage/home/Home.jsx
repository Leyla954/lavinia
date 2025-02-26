"use client";
import { useState } from "react";
import Carousel from "../carousel/page";
import StepForm from "../stepForm/form/page";
import Link from "next/link";
import { StarFilled } from "@ant-design/icons";

const Home = () => {
  const [showStepForm, setShowStepForm] = useState(false);
  
  const tailors = [
    {
      name: "John Doe",
      experience: "10 years experience",
      description: "Expert in custom dresses and suits. Skilled in modern and traditional tailoring techniques.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Jane Smith",
      experience: "8 years experience",
      description: "Specialist in wedding dresses and alterations. Known for attention to detail and craftsmanship.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Michael Johnson",
      experience: "12 years experience",
      description: "Master tailor for all fabric types. Passionate about creating unique and stylish pieces.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  return (
    <main>
      <section>
        <div className="w-full h-full p-4 sm:p-7 bg-right bg-cover bg-no-repeat bg-fixed bg-transparent bg-[url('https://i.pinimg.com/736x/d3/ba/35/d3ba35a4f9f3c3d475b03671cb86b035.jpg')] flex flex-col items-center">
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
            <div className="my-7 w-full">
              <StepForm onClose={() => setShowStepForm(false)} />
            </div>
          )}
          <div className="my-7 w-full">
            <Link href="/pages/homepage/yourstyle">
              <img src="https://www.moodfabrics.com/blog/wp-content/uploads/Explore-Now.png" alt="go to yourstyle" className="cursor-pointer sm:w-[40%] max-w-full m-auto" />
            </Link>
          </div>
          <div className="m-7 max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-7">
          {tailors.map((tailor, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-white p-5 sm:p-7 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <img src={tailor.image} alt={tailor.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-blue-300" />
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-lg text-blue-700">{tailor.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{tailor.experience}</p>
                <p className="text-sm text-gray-500 italic">{tailor.description}</p>
                <div className="flex justify-center sm:justify-start mt-2">
                  {Array.from({ length: tailor.rating }).map((_, i) => (
                    <StarFilled key={i} className="text-yellow-500 text-lg" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
