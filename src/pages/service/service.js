import React, { useEffect, useState } from 'react';
import axios from 'axios';

// icon
import { FaNewspaper } from 'react-icons/fa';

// animation Load
import { BounceLoader } from 'react-spinners'; 


const Service = () => {
    const [services, setServices] = useState([]);
    const [recentServices, setRecentServices] = useState([]);
    const [slogan, setSlogan] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/service");
                setServices(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        if (services.length > 0) {
            const recent = services.slice(0, 5);
            setRecentServices(recent);
        }
    }, [services]);

    useEffect(() => {
        const fetchSlogan = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/info/6653de4fc331853f432df898');
                setSlogan(res.data.intro);
            } catch (error) {
                console.error('Error fetching slogan:', error);
            }
        };
        fetchSlogan();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = services.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <BounceLoader color="#dc2626" loading={loading} size={50} />
            </div>
        );
    }

    if (!services) {
        return <div>Error loading service detail...</div>;
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-3 news-container grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <h1 className="text-3xl font-bold mb-4">Our Services</h1>
                        <p className="text-gray-700 mb-4">{slogan}</p>

                        {currentPosts.map((service) => (
                            <div key={service._id} className="news-card bg-white border border-gray-200 rounded-lg shadow p-4">
                                <img src={service.image && service.image.url} alt={service.caption} className="w-full h-48 object-cover rounded-t-lg" />
                                <h3 className="text-xl font-bold mt-4">{service.caption}</h3>
                                <p className="text-gray-700 mt-2">{service.intro}</p>
                                <a href={`/service/${service._id}`} className="text-blue-600 mt-4 block">Read more</a>
                            </div>
                        ))}
                    </div>
                    <div className="recent-news bg-white border border-gray-200 rounded-lg shadow p-4">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <FaNewspaper className="mr-2" /> Recent Service
                        </h3>
                        <ul className="space-y-4">
                            {recentServices.map((recentService) => (
                                <li key={recentService._id}>
                                    <a href={`/service/${recentService._id}`} className="text-blue-600">{recentService.caption}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={services.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="flex justify-center">
                {pageNumbers.map(number => (
                    <li key={number} className={`mx-1 ${number === currentPage ? 'text-red-500' : ''}`}>
                        <button onClick={() => paginate(number)} className="px-4 py-2 border rounded-lg">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Service;
