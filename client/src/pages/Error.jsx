import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';



const NotLoggedIn = () => {

    const {authUser} = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if(authUser) {
                navigate('/home')
            }
            else{
                navigate("/login")
            }
        }, 2000);

        return () => clearTimeout(timer); 
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">{authUser ? "You are not admin" : "Login to access this page"}</h1>
                <p className="text-gray-500 mt-2">{authUser ? "Redirecting to Home page.." : "Redirecting to login page.."}.</p>
            </div>
        </div>
    );
};

export default NotLoggedIn;