import { CloseOutlined } from "@ant-design/icons";

const Calculate = ({ waistSize, lengthSize, selectedImage, onClose }) => {
  const resultImages = {
    "https://www.moodfabrics.com/media/StaticPageImages/9.png": "https://www.moodfabrics.com/media/StaticPageImages/31.jpg",
    "https://www.moodfabrics.com/media/StaticPageImages/10.png": "https://www.moodfabrics.com/media/StaticPageImages/32.jpg",
    "https://www.moodfabrics.com/media/StaticPageImages/11.png": "https://www.moodfabrics.com/media/StaticPageImages/33.jpg",
    "https://www.moodfabrics.com/media/StaticPageImages/12.png": "https://www.moodfabrics.com/media/StaticPageImages/34.jpg",
  };

  const calculateMeasurements = () => {
    const radius = (waistSize / (2 * Math.PI)).toFixed(2);
    const fabricLength = (parseFloat(lengthSize) + parseFloat(radius)).toFixed(2);
    return { radius, fabricLength, fabricWidth: "Standard Width" };
  };

  const { radius, fabricLength, fabricWidth } = calculateMeasurements();

  return (
    <div className="relative mt-6 p-6 bg-[rgb(249,238,226)] shadow-lg rounded-lg flex flex-col items-center">
      <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
        <CloseOutlined style={{ fontSize: "20px" }} />
      </button>
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 text-center">Result</h2>
      <p className="text-lg text-gray-700 mt-3 text-center">In our expert opinion, we recommend:</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[{ label: "Waist Radius", value: `${radius} cm` },
          { label: "Fabric Length", value: `${fabricLength} cm` },
          { label: "Fabric Width", value: fabricWidth }
        ].map(({ label, value }) => (
          <div key={label} className="p-4 rounded-md shadow-md bg-white">
            <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
            <p className="text-gray-700 mt-1">{value}</p>
          </div>
        ))}
      </div>
      {selectedImage && resultImages[selectedImage] && (
        <img src={resultImages[selectedImage]} alt="Result" className="w-full mt-4 rounded-md object-contain" />
      )}
    </div>
  );
};

export default Calculate;
