import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoShareSocial } from "react-icons/io5";
import { FaArrowLeft } from 'react-icons/fa';
import { BounceLoader } from 'react-spinners';

const SolutionDetail = () => {
    const { id } = useParams();
    const [solutionItem, setSolutionItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSolutionDetail = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/solution/${id}`);
                setSolutionItem(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching solution detail:", error.response?.data?.message || error.message);
            }
        };

        fetchSolutionDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <BounceLoader color="#dc2626" loading={loading} size={50} />
            </div>
        );
    }

    if (!solutionItem) {
        return <div>Error loading solution detail...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                <div className="py-8">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex items-center mb-4">
                            <a href="/solution" className="flex items-center text-blue-600 hover:text-blue-800">
                                <FaArrowLeft className="mr-1" /> Back to Solutions
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-1">
                                <img src={solutionItem.mainImage?.url} alt={solutionItem.title} className="w-full h-auto object-cover rounded-lg" />
                            </div>
                            <div className="col-span-1">
                                <h1 className="text-3xl font-bold mb-4">{solutionItem.title}</h1>
                                <p className="text-gray-700 mb-4"><strong>{solutionItem.intro}</strong></p>
                                <h2 className="text-2xl font-bold mb-2">{solutionItem.paraOneTitle}</h2>
                                <p className="text-gray-700 mb-4">{solutionItem.paraOneDescription}</p>
                                <h2 className="text-2xl font-bold mb-2">{solutionItem.paraTwoTitle}</h2>
                                <p className="text-gray-700 mb-4">{solutionItem.paraTwoDescription}</p>
                                <h2 className="text-2xl font-bold mb-2">{solutionItem.paraThreeTitle}</h2>
                                <p className="text-gray-700 mb-4">{solutionItem.paraThreeDescription}</p>
                                <p className="text-blue-400 mb-4 flex items-center space-x-2">
                                    <IoShareSocial className="inline-block" />
                                    <a href={solutionItem.link} target="_blank" rel="noopener noreferrer" className="inline-block">Link</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolutionDetail;
