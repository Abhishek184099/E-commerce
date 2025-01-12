import React from 'react'
import { logo } from '../assets/pic'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";






export default function Contact() {
  return (
    <div className='flex justify-between items-center gap-4 px-10 my-16   '>
        <div className='flex flex-col justify-center items-start gap-2 mx-5'>
            <img src={logo} alt="" />
            <p className='text-left text-slate-400 w-64'>
            Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit. 
            Gravida massa volutpat aenean odio erat nullam fringilla.
            </p>
            <div className='flex justify-center items-center gap-4 text-slate-400 py-2'>
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedinIn />
            <FaYoutube />
            </div>

        </div>

        <div className='flex flex-col items-start  px-10 gap-3'>
            <h2 className='uppercase text-2xl '>
                Quick Links
            </h2>
            <ul className='flex flex-col list-none uppercase font-light cursor-pointer'>
                <li>home</li>
                <li>about</li>
                <li>shop</li>
                <li>blogs</li>
                <li>contact</li>
            </ul>

        </div>

        <div className='flex flex-col items-start justify-center px-10 gap-3'>
            <h2 className='uppercase text-2xl '>
            Help & Info Help
            </h2>
            <ul className='flex flex-col list-none uppercase font-light cursor-pointer'>
                <li>Track Your Order</li>
                <li>Returns Policies</li>
                <li>Shipping + Delivery</li>
                <li>Contact Us</li>
                <li>faqs</li>
            </ul>

        </div>

        <div className='flex flex-col px-10 gap-4'>
            <h2 className='uppercase text-2xl '>
                contact us
            </h2>
           <p className='text-slate-400 w-64'>
           Do you have any queries or suggestions?
           <span className='text-black'>yourinfo@gmail.com</span> 
           </p>
           <p className='text-slate-400 w-64'>
           If you need support? Just give us a call. 
           <span className='text-black'>+55 111 222 333 44</span>
           </p>

        </div>
     
    </div>
  )
}
