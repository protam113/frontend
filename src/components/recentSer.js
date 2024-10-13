import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Service = () => {
    const [recentServices, setRecentServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentServices = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/service");
                const sortedServices = data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                setRecentServices(sortedServices.slice(0, 4));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recent services:", error);
            }
        };
        fetchRecentServices();
    }, []);

    useEffect(() => {
        function handleResize() {
            // Calculate number of columns based on window width
            const numColumns = Math.floor(window.innerWidth / 300); // Change 300 to your preferred width per service card
            document.documentElement.style.setProperty('--num-columns', numColumns);
        }
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Call handleResize on initial render

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!recentServices) {
        return <div>Error loading recent services...</div>;
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                {/* Header */}
                <h1 className="text-3xl font-semibold mb-4">Dịch vụ của chúng tôi</h1>

                {/* Display Recent Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
                    {recentServices.map(service => (
                        <div key={service._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <img src={service.image && service.image.url} alt={service.caption} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{service.caption}</h3>
                                <a href={`/service/${service._id}`} className="text-blue-600 mt-4 block">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button to Service Page */}
                <div className="flex justify-center mt-8">
                    <a href="/service" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5">
                        Xem tất cả dịch vụ
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Service;
