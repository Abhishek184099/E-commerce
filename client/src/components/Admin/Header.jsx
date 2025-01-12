import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { logo } from '../../assets/pic'; 


const Header = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const {logout}= useLogout();

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
            <div className="flex items-center">
                <Link to={'/home'}><img src={logo} alt="Logo" className="h-10 mr-4 bg-white" /></Link>
                <span className="text-xl font-semibold">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 rounded-md text-gray-800"
                    />
                </div>
                <div className="text-sm">
                    <span>{currentDate}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
