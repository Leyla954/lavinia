import { useState } from "react";
import Calculate from "../calculate/page";
import { CloseOutlined } from "@ant-design/icons";

const StepForm = () => {
  const [selectedImages, setSelectedImages] = useState({});
  const [step2Images, setStep2Images] = useState([
    "https://www.moodfabrics.com/media/StaticPageImages/15.png",
    "https://www.moodfabrics.com/media/StaticPageImages/16.png",
    "https://www.moodfabrics.com/media/StaticPageImages/17.png"
  ]);

  const [waistSize, setWaistSize] = useState(40);
  const [lengthSize, setLengthSize] = useState(0);
  const [selectedStep3Image, setSelectedStep3Image] = useState(null);
  const [showCalculate, setShowCalculate] = useState(false);

  const step3Images = [
    "https://www.moodfabrics.com/media/StaticPageImages/9.png",
    "https://www.moodfabrics.com/media/StaticPageImages/10.png",
    "https://www.moodfabrics.com/media/StaticPageImages/11.png",
    "https://www.moodfabrics.com/media/StaticPageImages/12.png"
  ];

  const resultImages = {
    [step3Images[0]]: "https://www.moodfabrics.com/media/StaticPageImages/31.jpg",
    [step3Images[1]]: "https://www.moodfabrics.com/media/StaticPageImages/32.jpg",
    [step3Images[2]]: "https://www.moodfabrics.com/media/StaticPageImages/33.jpg",
    [step3Images[3]]: "https://www.moodfabrics.com/media/StaticPageImages/34.jpg",
  };

  const handleImageSelect = (stepId, imageSrc) => {
    setSelectedImages((prev) => ({ ...prev, [stepId]: imageSrc }));
    if (stepId === 3) {
      setSelectedStep3Image(imageSrc);
    }

    if (stepId === 1 && imageSrc === "https://www.moodfabrics.com/media/StaticPageImages/2.png") {
      setStep2Images([
        "https://www.moodfabrics.com/media/StaticPageImages/4.png",
        "https://www.moodfabrics.com/media/StaticPageImages/6.png",
        "https://www.moodfabrics.com/media/StaticPageImages/7.png"
      ]);
    } else {
      setStep2Images([
        "https://www.moodfabrics.com/media/StaticPageImages/15.png",
        "https://www.moodfabrics.com/media/StaticPageImages/16.png",
        "https://www.moodfabrics.com/media/StaticPageImages/17.png"
      ]);
    }
  };

  const handleCalculateClick = () => {
    setShowCalculate(true);
  };

  const handleCloseCalculate = () => {
    setShowCalculate(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-7 shadow-md rounded-lg flex flex-col gap-6 relative bg-transparent">
      {[
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
      ].map(({ id, label, image, content, extraImages, extraSelects }) => (
        <div key={id} className="flex items-center p-6 rounded-lg relative shadow-md bg-transparent">
          <div className="flex flex-col items-center mr-4 w-16">
            <img src={image} alt={`Step ${id}`} className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">{label}</h2>
            <p className="text-lg text-gray-700 mt-3">{content}</p>
            {extraImages && (
              <div className="flex gap-4 mt-3">
                {extraImages.map((imgSrc, index) => (
                  <img key={index} src={imgSrc} alt={`Extra ${index}`} className={`w-32 h-auto border border-gray-300 rounded-md cursor-pointer ${selectedImages[id] === imgSrc ? 'bg-[rgb(249,238,226)]' : 'bg-white'}`} onClick={() => handleImageSelect(id, imgSrc)}/>
                ))}
              </div>
            )}
            {extraSelects && (
              <div className="mt-4 flex gap-4">
                {[
                  { label: "waist", value: waistSize, setValue: setWaistSize, min: 40 },
                  { label: "length", value: lengthSize, setValue: setLengthSize, min: 0 }
                ].map(({ label, value, setValue, min }) => (
                  <div key={label} className="relative w-24">
                    <input type="number" value={value} onChange={(e) => setValue(Math.max(min, Number(e.target.value)))} className="w-full h-10 border border-gray-300 rounded-md text-center appearance-none"/>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <button className="w-32 h-10 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition" onClick={handleCalculateClick}>Calculate</button>
      </div>
      {showCalculate && selectedStep3Image && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={handleCloseCalculate}><CloseOutlined style={{ fontSize: "20px" }} /></button>
            <Calculate selectedImage={resultImages[selectedStep3Image]} />
            <img src={resultImages[selectedStep3Image]} alt="Result" className="w-full mt-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepForm;