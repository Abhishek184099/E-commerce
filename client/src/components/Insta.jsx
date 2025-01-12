import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { insta1, insta2, insta3, insta4, insta5 } from '../assets/pic';

const images = [
    insta1,
    insta2,
    insta3,
    insta4,
    insta5,
];


const ImageGallery = () => {

    return (
        <>
        <div className='flex justify-center items-center my-10'>
        <h2 className='text-3xl uppercase'>shop our instagram</h2>

        </div>

            <div className="image-gallery flex gap-3 px-10 mb-10">
                {images.map((src, index) => (
                    <div key={index} className="relative group h-60 w-96">
                        <img src={src} alt={`Gallery ${index}`} className="w-full h-full" />
                        <div className="icon-container flex items-center justify-center">
                            <FaInstagram className="text-white text-4xl opacity-0 transition-all duration-500 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0" />
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
}

export default ImageGallery;










