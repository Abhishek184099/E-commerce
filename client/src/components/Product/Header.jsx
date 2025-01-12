import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { logo } from '../../assets/pic';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const { count } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="bg-white text-gray-900 shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4 mr-10">
                    <Link to="/home" className="text-2xl font-bold"><img src={logo} alt="" /></Link>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-200 text-gray-900 rounded-full px-4 py-2 focus:outline-none"
                        />
                        <FaSearch className="absolute right-2 top-2 text-gray-400" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative">
                        <FaShoppingCart className="text-2xl" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{count || 0}</span>
                    </Link>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        Your Orders
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
