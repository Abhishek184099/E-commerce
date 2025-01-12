import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import { logo, search } from '../assets/pic'; 
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';

export default function Header() {

  const {authUser} = useAuthContext();  

  const {logout} = useLogout();

  return (
    <div className='flex justify-between items-center px-10 h-20 shadow-md fixed z-50 w-full bg-white'>
      <div>
        <img src={logo} alt="Logo" />
      </div>

      <nav>
        <ul className='flex justify-start items-center gap-7 list-none text-lg uppercase'>
          <li className='hover:text-green-300'>
            <a href='#billboard'>Home</a>
          </li>
          <li className='hover:text-green-300'>
            <a href='#services'>Services</a>
          </li>
          <li className='hover:text-green-300'>
            <a href='#products'>Products</a>
          </li>
          <li className='hover:text-green-300'>
            <a href='#watches'>Watches</a>
          </li>
          <li className='hover:text-green-300'>
            <a href='#sale'>Sale</a>
          </li>
        </ul>
      </nav>

      <div className='flex gap-5 justify-center items-center text-lg relative'>
        <img src={search} alt="Search Icon" className='cursor-pointer' />
        <div className='relative group flex justify-center items-center cursor-pointer'>
          <FaUserAlt />
          <div className='absolute top-full  bg-white shadow-lg rounded hidden group-hover:block p-2'>
            <Link to={authUser?.role === "ADMIN" ? '/adminpanel' : '/getproduct'} className='whitespace-nowrap hover:bg-slate-100 p-2 block'>
            {
              authUser?.role === "ADMIN" ? "Admin Panel" : "Products"
            }
            </Link>
          </div>
        </div>
        <FaShoppingCart />
        {
          authUser ? (
           <button className='btn-md' onClick={()=> logout()} >Logout</button>
          ):(<Link to = {'/login'}>Login</Link>)
        }
         
        
      </div>
    </div>
  );
}
