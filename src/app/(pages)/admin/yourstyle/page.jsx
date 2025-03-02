// pages/admin/your-style.jsx
import React from 'react';

const YourStylePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">Manage Your Style</h1>
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Style Image</h2>
          <form className="space-y-4">
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg"
              accept="image/*"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Upload Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default YourStylePage;
