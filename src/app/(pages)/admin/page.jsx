'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const CarouselPage = dynamic(() => import('./carousel/page'), { ssr: false });
const UsersPage = dynamic(() => import('./users/page'), { ssr: false });

const AdminPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const renderContent = () => {
        switch (selectedCategory) {
            case 'carousel':
                return <CarouselPage />;
            case 'yourstyle':
                return <div className="bg-white shadow-lg shadow-green-300/80 rounded-xl p-6">Manage Your Style Section</div>;
            case 'reviews':
                return <div className="bg-white shadow-lg shadow-green-300/80 rounded-xl p-6">Manage Reviews Section</div>;
            case 'footer':
                return <div className="bg-white shadow-lg shadow-green-300/80 rounded-xl p-6">Edit Footer Section</div>;
            case 'users':
                return <UsersPage />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center bg-orange-50 w-full">
                        <h2 className="text-5xl font-semibold text-gray-800 mb-4">Welcome to the Admin Panel</h2>
                        <img src="https://www.stratanetworks.co.nz/wp-content/uploads/2021/12/animation_640_kwnxzzbe.gif" alt="" />
                    </div>
                );
        }
    };

    return (
        <div className="italic min-h-screen flex">
            <div className="w-64 shadow-lg shadow-green-500/100 sticky top-0 h-screen p-6">
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">Admin Panel</h1>
                <ul className="space-y-11">
                    <li>
                        <button onClick={() => setSelectedCategory('carousel')} className="w-full text-left text-black hover:bg-green-200 transition-all duration-300 shadow-lg shadow-green-500/80 p-2 rounded-lg">Manage Carousel</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedCategory('yourstyle')} className="w-full text-left text-black hover:bg-green-200 transition-all duration-300 shadow-lg shadow-green-500/80 p-2 rounded-lg">Manage Your Style</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedCategory('reviews')} className="w-full text-left text-black hover:bg-green-200 transition-all duration-300 shadow-lg shadow-green-500/80 p-2 rounded-lg">Manage Reviews</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedCategory('footer')} className="w-full text-left text-black hover:bg-green-200 transition-all duration-300 shadow-lg shadow-green-500/80 p-2 rounded-lg">Edit Footer</button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedCategory('users')} className="w-full text-left text-black hover:bg-green-200 transition-all duration-300 shadow-lg shadow-green-500/80 p-2 rounded-lg">Manage Users</button>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-6 flex items-center justify-center">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;
