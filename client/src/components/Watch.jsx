import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Watch() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const productsPerPage = 4;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product/getproduct');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                const filteredProducts = data.filter(product => {
                    console.log(product.description.toLowerCase());
                    return product.description.toLowerCase() === "watch";
                });
                setProducts(filteredProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (<div className="flex justify-center items-center h-screen">Loading...</div>);
    }
    if (error) {
        return (<div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>);
    }

    const totalSets = products.length - productsPerPage + 1; // Total starting indices for sliding window

    const handleSetChange = (index) => {
        setStartIndex(index);
    };

    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className="container mx-auto p-4 flex flex-col gap-5" id='watches'>
            <div className='flex justify-between items-center mx-5'>
                <h1 className='font-semibold text-3xl uppercase'>
                    Watch products
                </h1>
                <Link to={'/getproduct'} className='text-2xl uppercase underline'>Go to shop</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5">
                {currentProducts.map((product) => (
                    <div
                        key={product._id}
                        className="relative bg-white shadow-md rounded-lg overflow-hidden group cursor-pointer"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{product.title}</h3>
                            <p className="text-gray-600">{product.price} USD</p>
                        </div>
                        <button
                            className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalSets }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSetChange(index)}
                        className={`mx-1 w-3 h-3 rounded-full ${index === startIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
}
