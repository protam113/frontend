import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoShareSocial } from "react-icons/io5";
import { FaArrowLeft } from 'react-icons/fa';
import { BounceLoader } from 'react-spinners'; // Import ClipLoader từ thư viện react-spinners

const ServiceDetail = () => {
    const { id } = useParams();
    const [serviceItem, setServiceItem] = useState(null);
    const [recentServices, setRecentServices] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm state cho loading

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/service/${id}`);
                setServiceItem(data.data); // Update the state with the service item data
                setLoading(false); // Đánh dấu là đã load xong dữ liệu
            } catch (error) {
                console.error("Error fetching service detail:", error.response?.data?.message || error.message);
            }
        };

        const fetchRecentServices = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/service");
                setRecentServices(data.data.slice(0, 5)); // Update the state with the recent services data
            } catch (error) {
                console.error("Error fetching recent services:", error.response?.data?.message || error.message);
            }
        };

        fetchServiceDetail();
        fetchRecentServices();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                {/* Sử dụng ClipLoader từ react-spinners */}
                <BounceLoader color="#dc2626" loading={loading} size={50} />
            </div>
        );
    }

    if (!serviceItem) {
        return <div>Error loading service detail...</div>;
    }
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                <div className="py-8">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex items-center mb-4">
                            <a href="/service" className="flex items-center text-blue-600 hover:text-blue-800">
                                <FaArrowLeft className="mr-1" /> Back to Services
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-1">
                                <img src={serviceItem.image?.url} alt={serviceItem.title} className="w-full h-auto object-cover rounded-lg" />
                            </div>
                            <div className="col-span-1">
                                <h1 className="text-3xl font-bold mb-4">{serviceItem.title}</h1>
                                <p className="text-gray-700 mb-4"><strong>{serviceItem.caption}</strong></p>
                                <p className="text-gray-700 mb-4">{serviceItem.intro}</p>
                                <p className="text-gray-700 mb-4">{serviceItem.description}</p>
                                <p className="text-blue-400 mb-4 flex items-center space-x-2">
                                    <IoShareSocial className="inline-block" />
                                    <a href={serviceItem.link} target="_blank" rel="noopener noreferrer" className="inline-block">Link</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recent-services bg-white border border-gray-200 rounded-lg shadow p-4 mt-8">
                    <h3 className="text-xl font-bold mb-4">Recent Services</h3>
                    <ul className="space-y-4">
                        {recentServices.map(item => (
                            <li key={item._id}>
                                <a href={`/service/${item._id}`} className="text-blue-600">{item.caption}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;


