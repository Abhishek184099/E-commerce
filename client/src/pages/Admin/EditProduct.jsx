import React, { useEffect, useState } from 'react';
import { fetchProductById, updateProduct } from '../../services/productService';

const EditProductForm = ({ productId, onClose }) => {
    const [form, setForm] = useState({
        title: '',
        price: '',
        description: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await fetchProductById(productId);
                console.log(fetchedProduct);
                setForm({
                    title: fetchedProduct.title,
                    price: fetchedProduct.price,
                    description: fetchedProduct.description,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(productId, form);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded w-full"
                ></textarea>
            </div>
       
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
            </div>
        </form>
    );
};

export default EditProductForm;
