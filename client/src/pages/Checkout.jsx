import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order/getorders');
                if (!response.ok) {
                    throw new Error('You have not placed any order');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-black text-2xl">{error}</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Order Confirmation</h2>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong className="font-bold">Order Placed!</strong>
                <span className="block sm:inline"> You will receive your order in a few days.</span>
            </div>
            {orders.map(order => (
                <div key={order._id} className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <h3 className="text-xl font-semibold mb-4">Order ID: {order._id}</h3>
                    {order.products.map(product => (
                        <div key={product._id} className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <img
                                    src={product.image || 'https://via.placeholder.com/50'}
                                    alt={product.title}
                                    className="w-12 h-12 object-cover rounded-lg"
                                />
                                <div className="ml-4">
                                    <span className="text-lg font-medium">{product.title}</span>
                                    <span className="block text-gray-600">{product.price} USD</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="text-center mt-6">
                <button
                    onClick={() => navigate('/getproduct')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Buy More
                </button>
            </div>
        </div>
    );
};

export default Checkout;
