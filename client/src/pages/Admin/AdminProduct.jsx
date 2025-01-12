import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../services/productService';
import EditProductForm from './EditProduct';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [editProductId, setEditProductId] = useState(null);
    const productsPerPage = 8;

    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsData();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter(product => product._id !== productId));
        } catch (err) {
            console.error('Error deleting product:', err.message);
        }
    };

    const handleUpdate = (productId) => {
        setEditProductId(productId);
    };

    const handleCloseEditForm = () => {
        setEditProductId(null);
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='flex flex-col min-h-screen mt-0'>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentProducts.map((product) => (
                        <div key={product._id} className="relative bg-gray-800 text-gray-100 shadow-md rounded-lg overflow-hidden group">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold uppercase">{product.title}</h3>
                                <p className="text-gray-400">{product.price} USD</p>
                                <div className="flex justify-between mt-2">
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                                        onClick={() => handleUpdate(product._id)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                {editProductId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                        <EditProductForm productId={editProductId} onClose={handleCloseEditForm} />
                    </div>
                )}
            </div>
        </div>
    );
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex list-none">
                {pageNumbers.map(number => (
                    <li key={number} className="mx-1">
                        <button
                            onClick={() => paginate(number)}
                            className={`px-3 py-2 rounded-lg ${
                                number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AdminProduct;
