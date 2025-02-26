'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDessing } from "@/app/redux/features/dessingSlice";
import { Spin } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const categories = ["Body", "Sleeve", "Skirt Style", "Your Dress"];

const sleeveImages = [
  "https://files.ecommercedns.uk/231423/bb1f2b82365463dc467670b13df36559.png",
  "https://files.ecommercedns.uk/231423/e218f8894ffaf25d7201046d69a876bb.png",
  "https://files.ecommercedns.uk/231423/1e4a677fb5e3182660f0f9b92d858257.png",
  "https://files.ecommercedns.uk/231423/526e390cb71f410b5cb2d36bb906dd57.png",
  "https://files.ecommercedns.uk/231423/77f0f8c064a2e342ed03550cc49b9e4d.png",
  "https://files.ecommercedns.uk/231423/269cde95f8ba637b7e9e06702bcca6fd.png",
  "https://files.ecommercedns.uk/231423/673fdadc31b4ee2d6dd63105587aebd5.png",
  "https://files.ecommercedns.uk/231423/745e98399ab8443e8c971f51e891814e.png",
  "https://files.ecommercedns.uk/231423/7911987de32f354f6e87a024b4bd3dd2.png",
  "https://files.ecommercedns.uk/231423/f74f0d32c0d21e7ea2efa67e72b13eb5.png",
  "https://files.ecommercedns.uk/231423/3fe68a7a4332d697319535040ea4d312.png",
  "https://files.ecommercedns.uk/231423/0b57f4c06889452cd6336216c42c19a6.png",
  "https://files.ecommercedns.uk/231423/80935a276f0359831210ea477699af9c.png"
];

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
  const [savedSelections, setSavedSelections] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchDessing());
    }
  }, [dispatch, data.length]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSelections = JSON.parse(localStorage.getItem("savedSelections")) || [];
      setSavedSelections(storedSelections);
  
      // Əgər seçimlər varsa, sonuncusunu `Your Dress` kimi göstər, yoxdursa `Your Dress`-i sıfırla
      if (storedSelections.length > 0) {
        setSelectedItems(prev => ({ ...prev, "Your Dress": storedSelections[storedSelections.length - 1]["Your Dress"] }));
      } else {
        setSelectedItems(prev => {
          const newState = { ...prev };
          delete newState["Your Dress"]; // Boşdursa, Your Dress-i sil
          return newState;
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedSelections", JSON.stringify(savedSelections));
  }, [savedSelections]);

  const handleSelection = (category, image) => {
    if (!data || data.length === 0) return;

    setSelectedItems((prev) => {
      if (category === "Sleeve") {
        const newIndex = data.filter(item => item.category === "Sleeve").findIndex(item => item.image === image);
        return { ...prev, Sleeve: sleeveImages[newIndex] || image };
      }
      return {
        ...prev,
        [category]: image,
      };
    });
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
    if (savedSelections.length < 6) {
      setSavedSelections((prev) => {
        const updatedSelections = [...prev, JSON.parse(JSON.stringify(selectedItems))];
        localStorage.setItem("savedSelections", JSON.stringify(updatedSelections));
        return updatedSelections;
      });
    }
  };

  const removeSavedSelection = (index) => {
    setSavedSelections((prev) => {
      const updatedSelections = prev.filter((_, i) => i !== index);
      localStorage.setItem("savedSelections", JSON.stringify(updatedSelections));
      return updatedSelections;
    });
  };

  if (status === "loading") return <Spin size="large" />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="relative min-h-screen bg-cover bg-center px-4 md:px-6 lg:px-8 bg-[url('https://www.creativefabrica.com/wp-content/uploads/2021/10/29/Abstract-Watercolor-Background-Design-Graphics-19383758-1.jpg')]">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto h-auto p-4 md:p-6 bg-gray-100 rounded-lg shadow-lg shadow-green-300/80">
        <div className="relative w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
          <img
            src="https://files.ecommercedns.uk/231423/3ef155cdbc4291b907e11eda1abb7dd6.png"
            alt="Dress Preview"
            className="w-full h-auto object-contain rounded-lg"
          />
          {Object.entries(selectedItems).map(([category, image], index) => (
            category !== "Your Dress" && (
              <img
                key={index}
                src={image}
                alt="Overlay"
                className={`absolute object-contain ${
                  category === "Body" ? "w-[20%] h-[30%] top-[13%] left-[40%]" :
                    category === "Sleeve" ? "w-[90%] h-full bottom-[2%] left-[5%] shadow-lg" :
                      category === "Skirt Style" ? "w-[54%] h-[40%] bottom-[29%] left-[23%]" :
                        "w-full h-full"
                  }`}
              />
            )
          ))}
        </div>
        <div className="flex flex-col w-full mt-7 md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex flex-wrap gap-3 justify-start">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${selectedCategory === category ? "shadow-lg shadow-green-500/80" : "shadow-sm"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {data
              .filter((item) => item.category === selectedCategory)
              .map((item) => (
                <label
                  key={item.id}
                  className={`p-3 border rounded-lg w-20 h-20 flex flex-col items-center justify-center overflow-hidden cursor-pointer shadow-md transition-all ${selectedItems[selectedCategory] === item.image ? "shadow-green-500/80" : ""}`}
                  onClick={() => handleSelection(selectedCategory, item.image)}
                >


 
        
        


                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                </label>
              ))}
          </div>
 
          {selectedCategory === "Your Dress" && savedSelections.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {savedSelections.map((selection, index) => (
                <div key={index} className="p-2 border rounded-lg bg-white shadow-md relative w-32 h-40 flex items-center justify-center">
                  <img
                    src="https://files.ecommercedns.uk/231423/3ef155cdbc4291b907e11eda1abb7dd6.png"
                    alt="Saved Dress"
                    className="w-32 h-full object-cover rounded-lg"
                  />
                  {Object.entries(selection).map(([category, image], i) => (
                    category !== "hoverIndex" && (
                      <img
                        key={i}
                        src={image}
                        alt="Overlay"
                        className={`absolute object-contain ${category === "Body" ? "w-[20%] h-[30%] top-[10%] left-[40%] z-10" :
                            category === "Sleeve" ? "size-full bottom-[3%] z-10" :
                              category === "Skirt Style" ? "w-[50%] h-[41%] bottom-[33%] left-[25%] z-0" :
                                "w-full h-full"
                          }`}
                      />
                    )
                  ))}
                  <button
                    className="absolute bottom-2 right-2 text-red-500 p-1 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSavedSelection(index);
                    }}
                  >
                    <CloseCircleOutlined />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-4 px-6">
            <button onClick={saveSelection} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
            <button onClick={resetSelection} className="px-4 py-2 bg-red-500 text-white rounded-lg">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DessingPage;
