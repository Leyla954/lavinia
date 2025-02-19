const Calculate = ({ selectedImage }) => {
  if (!selectedImage) return null;

  return (
    <div className="mt-6 p-6 border rounded-lg shadow-md bg-[rgb(249,238,226)]">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Result</h2>
      <div className="w-full h-1 bg-gray-800 my-4"></div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 border rounded-md shadow-sm bg-white">
          <h3 className="font-semibold text-gray-700">Waist Radius</h3>
          <p className="text-lg font-bold text-gray-900">0.00</p>
        </div>
        <div className="p-4 border rounded-md shadow-sm bg-white">
          <h3 className="font-semibold text-gray-700">Fabric Length</h3>
          <p className="text-lg font-bold text-gray-900">0.00</p>
        </div>
        <div className="p-4 border rounded-md shadow-sm bg-white">
          <h3 className="font-semibold text-gray-700">Fabric Width</h3>
          <p className="text-lg font-bold text-gray-900">0.00</p>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
