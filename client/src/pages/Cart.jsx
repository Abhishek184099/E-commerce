import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/cart/getcart');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                calculateTotalAmount(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const calculateTotalAmount = (products) => {
        const total = products.reduce((acc, product) => acc + product.price, 0);
        setTotalAmount(total);
    };

    const handleRemoveProduct = async (productId) => {
        try {
            const response = await fetch(`/api/cart/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove product');
            }
            const updatedProducts = products.filter(product => product._id !== productId);
            setProducts(updatedProducts);
            calculateTotalAmount(updatedProducts);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEmptyCart = async () => {
        try {
            const response = await fetch('/api/cart/emptycart', {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to empty cart');
            }
            setProducts([]);
            setTotalAmount(0);
        } catch (err) {
            setError(err.message);
        }

    };

    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/order/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to place order');
            }
            setOrderPlaced(true);
            handleEmptyCart();
            toast.Cart("Order Placed Successfully")
        } catch (err) {
            setError(err.message);
        }
       
        navigate("/checkout")
        
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (orderPlaced) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Order Confirmation</h2>
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Order Placed!</strong>
                    <span className="block sm:inline"> You will receive your order in a few days.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {products.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <>
                    {products.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg"
                        >
                            <img
                                src={item.image || 'https://via.placeholder.com/50'}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex flex-col ml-4">
                                <span className="text-lg font-semibold">{item.title}</span>
                                <span className="text-gray-600">{item.price} USD</span>
                            </div>
                            <button
                                onClick={() => handleRemoveProduct(item._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-semibold">Total Amount: {totalAmount} USD</span>
                        <div className="space-x-4">
                            <button
                                onClick={handleCheckout}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={handleEmptyCart}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Empty Cart
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
