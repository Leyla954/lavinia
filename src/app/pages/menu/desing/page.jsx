'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDessing } from "@/app/redux/features/dessingSlice";
import { Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const categories = ["Body", "Sleeve", "Skirt Style", "Your Dress"];

const DessingPage = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.dessing);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedItems, setSelectedItems] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("selectedItems")) || {};
    }
    return {};
  });
  const [savedSelections, setSavedSelections] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("savedSelections")) || [];
    }
    return [];
  });

  useEffect(() => {
    dispatch(fetchDessing());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    localStorage.setItem("savedSelections", JSON.stringify(savedSelections)); 
  }, [savedSelections]);  

  const handleSelection = (category, image, index) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: image,
    }));
  };

  const resetSelection = () => {
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };
      Object.keys(updatedItems).forEach((key) => {
        if (key !== "Your Dress") {
          delete updatedItems[key];
        }
      });
      return updatedItems;
    });
  };

  const saveSelection = () => {
    if (selectedItems["Your Dress"]) {
      if (savedSelections.length < 6) {
        setSavedSelections((prev) => [
          ...prev,
          { ...selectedItems, "Your Dress": selectedItems["Your Dress"] },
        ]);
      }
    }
  };
  
  const removeSavedSelection = (index) => {
    const updatedSelections = savedSelections.filter((_, i) => i !== index);
    setSavedSelections(updatedSelections);
    localStorage.setItem("savedSelections", JSON.stringify(updatedSelections));
  };

  if (status === "loading") return <Spin size="large" />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col md:flex-row m-auto w-full md:w-4/5 lg:w-3/4 h-auto p-6 my-7 bg-gray-100 rounded-lg shadow-lg">
      <div className="relative w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
        <img
          src="https://files.ecommercedns.uk/231423/3ef155cdbc4291b907e11eda1abb7dd6.png"
          alt="Dress Preview"
          className="w-full h-auto md:h-[550px] object-contain rounded-lg"
        />
        {Object.entries(selectedItems).map(([category, image], index) => (
          category !== "Your Dress" && (
            <img
              key={index}
              src={image}
              alt="Overlay"
              className={`absolute object-contain ${category === "Body" ? "w-[20%] h-[30%] top-[13%] left-[40%]" :
                category === "Sleeve" ? "w-[20%] h-[30%] top-[1%] left-0" :
                category === "Skirt Style" ? "w-[51%] h-[40%] bottom-[30%] left-[24%]" :
                "w-full h-full"}`}
            />
          )
        ))}
      </div>

      <div className="flex flex-col w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-3 px-4 md:px-6 space-x-2 justify-start">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${selectedCategory === category ? "shadow-lg shadow-green-500/80" : "shadow-sm"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
          <button
            className="px-3 py-1 shadow-lg rounded-lg shadow-green-500/80"
            onClick={saveSelection}
          >
            <CheckCircleOutlined />
          </button>
          <button
            className="px-4 py-1 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
            onClick={resetSelection}
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-6 gap-3"> 
          {data
            .filter((item) => item.category === selectedCategory)
            .map((item, index) => (
              <label
                key={item.id}
                className={`p-3 border rounded-lg w-20 h-20 flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all ${
                  selectedItems[selectedCategory] === item.image
                    ? "shadow-lg shadow-green-500/80"
                    : "shadow-sm"
                }`}
                onClick={() => handleSelection(selectedCategory, item.image, index)}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              </label>
            ))}
        </div>

        {selectedCategory === "Your Dress" && savedSelections.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {savedSelections.map((selection, index) => (
              <div key={index} className="p-2 border rounded-lg bg-white shadow-md relative flex items-center justify-center">
                <img
                  src="https://files.ecommercedns.uk/231423/3ef155cdbc4291b907e11eda1abb7dd6.png"
                  alt="Saved Dress"
                  className="w-full sm:w-32 h-full object-cover rounded-lg"
                />
                {Object.entries(selection).map(([category, image], i) => (
                  category !== "Your Dress" && (
                    <img
                      key={i}
                      src={image}
                      alt="Overlay"
                      className={`absolute object-contain ${category === "Body" ? "w-[20%] h-[30%] top-[10%] left-[40%]" :
                        category === "Sleeve" ? "w-[20%] h-[30%] bottom-[3%]" :
                        category === "Skirt Style" ? "w-[50%] h-[41%] bottom-[33%] left-[25%]" :
                        "w-full h-full"}`}
                    />
                  )
                ))}
                <button 
                  className="absolute bottom-2 right-2 text-red-500 p-1 rounded-full"
                  onClick={() => removeSavedSelection(index)}
                >
                  <CloseCircleOutlined />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DessingPage;
