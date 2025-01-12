import React from 'react';

const SubscriptionBox = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-black text-white px-7 space-y-4 md:space-y-0 md:space-x-4 my-10 mx-10 h-52 ">
            <div className="flex flex-col gap-2">
                <p className='text-2xl font-light uppercase'>Subscribe us now</p>
                <p className='text-slate-300'>Get latest news, updates and deals directly mailed to your inbox.</p>
            </div>
            <div className="">
                <input 
                    type="email" 
                    placeholder="Your email here ...." 
                    className="p-2 text-black w-96 py-4 outline-none"
                />
                <button className="bg-sky-300 text-white h-auto w-52 py-4 outline-none border-none">
                    Subscribe
                </button>
            </div>
        </div>
    );
}

export default SubscriptionBox;
