import React from 'react'
import {Link} from "react-router-dom"
import { image3 } from '../assets/pic'

export default function Sale() {
  return (
    <div className='bg-blue-50 max-w-screen flex overflow-x-hidden justify-center items-center gap-10'>
        <div className='flex flex-col gap-8 justify-center items-center'>
            <h3 className='text-2xl text-left'>
            10% Off
            </h3>
            <h2 className='text-5xl uppercase  '>
                  new year sale
            </h2>

            <Link to={'/getproduct'} className='btn btn-wide bg-black text-white hover:bg-black'>
                shop sale
            </Link>
    
        </div>

        <div className='mr-3'>
         <img src={image3} alt="" className='' />
        </div>
    </div>
  )
}
