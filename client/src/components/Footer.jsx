import React from 'react'
import { dhl,ship,visa,mastercard,paypal } from '../assets/pic'

export default function Footer() {
  return (
    <div className='flex justify-between items-center border-t-[1px] border-gray-400 mt-10 py-5'>
        <div className='flex gap-3 justify-center items-center mx-10'>
          <p className='capitalize text-slate-400 '>
            we ship with: 
          </p>
          <img src={dhl} alt="" />
          <img src={ship} alt="" />

        </div>
        <div className='flex gap-3 justify-center items-center'>
          <p className='uppercase text-slate-400'>
            payment option: 
          </p>
          <img src={visa} alt="" />
          <img src={mastercard} alt="" />
          <img src={paypal} alt="" />

        </div>

        <div className='w-96 text-left text-slate-400'>   
© Copyright 2023 MiniStore.
 Design by <span className='text-black'>TemplatesJungle</span>  Distribution by <span className='text-black'>ThemeWagon</span> 
        </div>




    </div>
  )
}
