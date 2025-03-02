'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
      e.preventDefault();
        const adminPassword = '123';

        if (password === adminPassword) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            router.push('/admin');
        } else {
            setError('Empy');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center shadow-lg shadow-green-500/100">
            <div className="bg-white shadow-lg rounded-xl p-6 w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
                <input
                    type="password"
                    placeholder="Pleace enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    onClick={handleLogin}
                    className="w-full bg-green-50 py-2 rounded-lg shadow-lg shadow-green-500/80 hover:bg-green-100 transition-all duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
