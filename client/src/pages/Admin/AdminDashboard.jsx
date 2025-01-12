import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AdminForm from './AdminForm';
import AdminProduct from './AdminProduct';
import EditProduct from './EditProduct'; // Import the EditProduct component
import Header from '../../components/Admin/Header';

export default function AdminDashboard() {
    const { authUser } = useAuthContext();
    const location = useLocation();

    const linkStyle = "block py-2 px-4 rounded transition-colors duration-200";
    const activeLinkStyle = "bg-blue-600 text-white";

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-grow overflow-hidden">
                <div className="w-64 bg-gray-900 text-gray-100 flex flex-col gap-2 py-4 items-center overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>

                    <div className="mt-3 flex justify-center items-center flex-col border-2 border-gray-700 px-4 py-4 rounded">
                        <img
                            src={authUser.profilePic || 'default-profile-pic-url'}
                            alt="Profile"
                            className="w-20 h-20 rounded-full mb-4 border-2 border-gray-700 object-cover"
                        />
                        <h1 className="text-lg font-semibold">{authUser.fullName}</h1>
                        <h1 className="text-sm text-gray-400">{authUser.role}</h1>
                    </div>

                    <div className="flex flex-col gap-3 mt-10 w-full">
                        <Link
                            to="/adminpanel/adminproducts"
                            className={`${linkStyle} ${location.pathname === '/adminpanel/adminproducts' ? activeLinkStyle : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            Products
                        </Link>
                        <Link
                            to="/adminpanel/uploadproduct"
                            className={`${linkStyle} ${location.pathname === '/adminpanel/uploadproduct' ? activeLinkStyle : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            Upload Products
                        </Link>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-gray-100">


                  
                    <Routes>
                        <Route path="/adminproducts" element={<AdminProduct />} />
                        <Route path="/uploadproduct" element={<AdminForm />} />
                        <Route path="/editproduct/:id" element={<EditProduct />} /> {/* Add the route for EditProduct */}
                    </Routes>
                </div>
            </div>
        </div>
    );
}
