import React, { useEffect, useState } from 'react';
import { image1, image2 } from '../assets/pic';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        { src: image1, text: 'Technology hack you won\'t get' },
        { src: image2, text: 'Your products are great' }
    ];

    const nextImage = () => {
        if (images.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    return (
        <div className='container px-4 rounded w-full pt-20' id='billboard'>
            <div className='h-[555px] w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                <div className='flex h-full w-full overflow-hidden'>
                    {images.map((image, index) => (
                        <div
                            className='w-full h-full min-w-full min-h-full transition-all flex justify-between items-center gap-7'
                            key={index}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <div className='mx-7 flex flex-col gap-3'>
                                <p className='uppercase text-6xl leading-normal'>{image.text}</p>
                                <button className='btn btn-wide outline-none border-none bg-black text-white cursor-pointer' onClick={()=>console.log('clicked')}>
                                    <Link to={'/getproduct'}>Shop Product</Link>
                                </button>
                            </div>
                            <img src={image.src} className='w-[500px] h-[500px]' alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
