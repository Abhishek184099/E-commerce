
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";


export default function Services() {
  return (
    <div className='flex justify-start items-center px-8 py-20 gap-2'  id='services'>
        <div className='flex gap-1 h-32 w-80 flex-col   '>
            <h1 className='flex gap-5 text-3xl uppercase justify-center items-center font-light'><FaShoppingCart className='text-blue-300'/>free delivery</h1>
             <p className=' text-zinc-400  text-left  pl-[70px] text-[20px]'>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
        </div>
        <div className='flex gap-1 h-32 w-80 flex-col  '>
            <h1 className='flex gap-5 text-3xl uppercase justify-center items-center font-light'><FaShoppingCart className='text-blue-300'/>free delivery</h1>
             <p className=' text-zinc-400  text-left   pl-[70px] text-[20px]'>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
        </div>
        <div className='flex gap-1 h-32 w-80 flex-col  '>
            <h1 className='flex gap-5 text-3xl uppercase justify-center items-center font-light'><FaShoppingCart className='text-blue-300'/>free delivery</h1>
             <p className=' text-zinc-400  text-left  pl-[70px] text-[20px]'>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
        </div>
        <div className='flex gap-1 h-32 w-80 flex-col   '>
            <h1 className='flex gap-5 text-3xl uppercase justify-center items-center font-light'><FaShoppingCart className='text-blue-300'/>free delivery</h1>
             <p className=' text-zinc-400  text-left  pl-[70px] text-[20px]'>Consectetur adipi elit lorem ipsum dolor sit amet.</p>
        </div>

    </div>
  )
}
