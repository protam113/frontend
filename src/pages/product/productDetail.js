import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { BounceLoader } from 'react-spinners'; 

const ProductDetail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/product/getall_product/${id}`, { withCredentials: true });
                setProduct(data.product);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };
        fetchProductDetail();

        const fetchRecentProducts = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/product/getall_product`, { withCredentials: true });
                setRecentProducts(data.products.slice(0, 5));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recent products:", error);
            }
        };
        fetchRecentProducts();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                {/* Sử dụng ClipLoader từ react-spinners */}
                <BounceLoader color="#dc2626" loading={loading} size={50} />
            </div>
        );
    }

    if (!product) {
        return <div>Error loading news detail...</div>;
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="detail-container flex flex-col lg:flex-row lg:space-x-4">
                    <div className="img-section w-full lg:w-1/2 bg-white border border-gray-200 rounded-lg shadow p-4">
                        <div className="mb-4">
                            <img src={product.image && product.image.url} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
                        </div>
                        <div className="thumb-grid grid grid-cols-3 gap-4">
                            <img src={product.image && product.image.url} alt="Thumbnail 1" className="w-full h-auto object-cover rounded-lg" />
                            <img src={product.image && product.image.url} alt="Thumbnail 2" className="w-full h-auto object-cover rounded-lg" />
                            <img src={product.image && product.image.url} alt="Thumbnail 3" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                    </div>
                    <div className="info-section w-full lg:w-1/2 bg-white border border-gray-200 rounded-lg shadow p-4">
                        <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                        <p className="text-gray-700 mb-4">{product.desc}</p>
                        <div className="text-3xl font-bold text-gray-900 mb-4">${product.price}</div>
                        <a href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                        <br />
                    </div>
                </div>
                <div className="recent-products mt-2">
                    <h2 className="text-2xl font-bold mb-4">Recent Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recentProducts.map(recentProduct => (
                            <div key={recentProduct._id} className="product-card bg-white border border-gray-200 rounded-lg shadow p-4">
                                <a href={`/product/product_detail/${recentProduct._id}`}>
                                    <img src={recentProduct.image && recentProduct.image.url} alt={recentProduct.productName} className="w-full h-auto object-cover rounded-lg" />
                                </a>
                                <div className="px-5 pb-5">
                                    <a href={`/product/product_detail/${recentProduct._id}`}>
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900">{recentProduct.productName}</h5>
                                    </a>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-3xl font-bold text-gray-900">${recentProduct.price}</span>
                                        <a href={`/product/product_detail/${recentProduct._id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
