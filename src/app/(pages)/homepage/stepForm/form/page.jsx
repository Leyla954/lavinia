import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Calculate from "../calculate/page";

const StepForm = ({ onClose }) => {
  const [selectedImages, setSelectedImages] = useState({});
  const [step2Images, setStep2Images] = useState([
    "https://www.moodfabrics.com/media/StaticPageImages/15.png",
    "https://www.moodfabrics.com/media/StaticPageImages/16.png",
    "https://www.moodfabrics.com/media/StaticPageImages/17.png"
  ]);
  const [waistSize, setWaistSize] = useState(35);
  const [lengthSize, setLengthSize] = useState(0);
  const [showCalculate, setShowCalculate] = useState(false);

  const step3Images = [
    "https://www.moodfabrics.com/media/StaticPageImages/9.png",
    "https://www.moodfabrics.com/media/StaticPageImages/10.png",
    "https://www.moodfabrics.com/media/StaticPageImages/11.png",
    "https://www.moodfabrics.com/media/StaticPageImages/12.png"
  ];

  const steps = [
    {
      id: 1,
      label: "Preferred Unit of Measure",
      image: "https://www.moodfabrics.com/media/StaticPageImages/1.png",
      content: "Choose between inches or centimeters.",
      extraImages: [
        "https://www.moodfabrics.com/media/StaticPageImages/2.png",
        "https://www.moodfabrics.com/media/StaticPageImages/3.png"
      ]
    },
    {
      id: 2,
      label: "CHOOSE Desired Length",
      image: "https://www.moodfabrics.com/media/StaticPageImages/5.png",
      content: "Mini, midi, or maxi? It’s so hard to choose! You should probably just make one of each.",
      extraImages: step2Images
    },
    {
      id: 3,
      label: "Select Skirt Fullness",
      image: "https://www.moodfabrics.com/media/StaticPageImages/8.png",
      content: "Four types of fullness? Well, you’re probably going to need one of each fullness in each length.",
      extraImages: step3Images
    },
    {
      id: 4,
      label: "Waist Measurement",
      image: "https://www.moodfabrics.com/media/StaticPageImages/13.png",
      content: "To measure the circumference accurately, wrap the tape measure around your waist.",
      extraSelects: true
    }
  ];

  const handleImageSelect = (stepId, imageSrc) => {
    setSelectedImages((prev) => ({ ...prev, [stepId]: imageSrc }));

    if (stepId === 1) {
      setStep2Images(imageSrc.includes("2.png")
        ? [
            "https://www.moodfabrics.com/media/StaticPageImages/4.png",
            "https://www.moodfabrics.com/media/StaticPageImages/6.png",
            "https://www.moodfabrics.com/media/StaticPageImages/7.png"
          ]
        : [
            "https://www.moodfabrics.com/media/StaticPageImages/15.png",
            "https://www.moodfabrics.com/media/StaticPageImages/16.png",
            "https://www.moodfabrics.com/media/StaticPageImages/17.png"
          ]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 sm:p-7 shadow-2xl rounded-lg flex flex-col gap-6 bg-transparent relative z-10">
      {/* Close Button */}
      <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
        <CloseOutlined style={{ fontSize: "20px" }} />
      </button>
      <h2 className="text-2xl font-bold text-center">Step Form</h2>
      {steps.map(({ id, label, image, content, extraImages, extraSelects }) => (
        <div key={id} className="flex flex-col sm:flex-row items-center p-6 rounded-lg shadow-md bg-transparent">
          <img src={image} alt={`Step ${id}`} className="w-16 h-auto sm:mr-4 mb-4 sm:mb-0" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">{label}</h2>
            <p className="text-lg text-gray-700 mt-3">{content}</p>
            {extraImages && (
              <div className="flex gap-4 mt-3 flex-wrap justify-center sm:justify-start">
                {extraImages.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`Extra ${index}`}
                    className={`w-24 sm:w-32 h-auto border border-gray-300 rounded-md cursor-pointer ${selectedImages[id] === imgSrc ? 'bg-[rgb(249,238,226)] border-2 border-orange-400' : 'bg-white'}`}
                    onClick={() => handleImageSelect(id, imgSrc)}
                  />
                ))}
              </div>
            )}
            {extraSelects && (
              <div className="mt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
                {[{ label: "Waist", value: waistSize, setValue: setWaistSize, min: 40 },
                  { label: "Length", value: lengthSize, setValue: setLengthSize, min: 0 }
                ].map(({ label, value, setValue, min }) => (
                  <div key={label} className="relative w-24 sm:w-28">
                    <input type="number" value={value} onChange={(e) => setValue(Math.max(min, Number(e.target.value)))} className="w-full h-10 border border-gray-300 rounded-md text-center appearance-none" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-6">
        <button onClick={() => setShowCalculate(true)} className="w-48 sm:w-60 h-14 sm:h-16 bg-green-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-green-500 transition">
          Calculate
        </button>
      </div>
      {showCalculate && (
        <Calculate waistSize={waistSize} lengthSize={lengthSize} selectedImage={selectedImages[3]} onClose={() => setShowCalculate(false)} />
      )}
    </div>
  );
};

export default StepForm;
