import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdFiberNew } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [news, setNews] = useState([]);
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [newsRes, servicesRes, productsRes, documentsRes, solutionsRes] = await Promise.all([
                    axios.get('http://localhost:4000/api/new/getAll'),
                    axios.get('http://localhost:4000/api/service'),
                    axios.get('http://localhost:4000/api/product/getall_product'),
                    axios.get('http://localhost:4000/api/document/getAll'),
                    axios.get('http://localhost:4000/api/solution'),
                ]);

                setNews(newsRes.data?.data?.slice(0, 3) || []);
                setServices(servicesRes.data?.data?.slice(0, 3) || []);
                setProducts(productsRes.data?.data?.slice(0, 3) || []);
                setDocuments(documentsRes.data?.data?.slice(0, 3) || []);
                setSolutions(solutionsRes.data?.data?.slice(0, 3) || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderIcon = (type) => {
        return <MdFiberNew className="text-red-600" />;
    };

    const renderSection = (items, type) => (
        <>
            {items.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <Link to={`/${type}/${item._id}`} key={item._id} className="flex items-center space-x-4">
                                <div className="w-16 h-16 overflow-hidden rounded-lg">
                                    <img 
                                        src={
                                            item.mainImage?.url || 
                                            item.image?.url || 
                                            item.image || 
                                            '' // Default empty string if no image field
                                        } 
                                        alt={item.title} 
                                        className="object-cover w-full h-full" 
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{item.title || item.caption}</h3>
                                    <div className="flex items-center text-gray-500">
                                        {renderIcon(type)}
                                        <span className="ml-2 capitalize">{type}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg hidden md:block">
            <h2 className="text-2xl font-bold mb-4">Recent Items</h2>
            {renderSection(news, 'news')}
            {renderSection(services, 'service')}
            {renderSection(products, 'product')}
            {renderSection(documents, 'document')}
            {renderSection(solutions, 'solution')}
        </div>
    );
};

export default Sidebar;
