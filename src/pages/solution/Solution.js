import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdDocument } from 'react-icons/io';
import { FaRegLightbulb } from 'react-icons/fa';

const UserSolution = () => {
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/solution');
                setSolutions(response.data.data);
            } catch (error) {
                console.error('Error fetching solutions:', error);
            }
        };

        fetchSolutions();
    }, []);

    return (
        <section className="grid grid-cols-4 gap-8 p-8">
            <div className="col-span-3">
                <h1 className="text-4xl font-bold text-center mb-8">Solutions</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution) => (
                        <div key={solution._id} className="bg-white shadow-md p-6 rounded-lg">
                            <img src={solution.mainImage.url} alt={solution.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
                            <h2 className="text-xl font-bold mb-2">{solution.title}</h2>
                            <p className="text-gray-700 mb-4">{solution.intro}</p>
                            <Link to={`/solution/${solution._id}`} className="text-blue-600 hover:underline">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-1">
                <h1 className="text-2xl font-bold mb-4">Recent</h1>
                <ul className="space-y-4">
                    {solutions.map((solution) => (
                        <li key={solution._id} className="flex items-center space-x-2">
                            {solution.category === "66514282cea9fade6714071d" ? (
                                <IoMdDocument className="text-blue-500" />
                            ) : (
                                <FaRegLightbulb className="text-yellow-500" />
                            )}
                            <Link to={`/solution/${solution._id}`} className="text-gray-700 hover:underline">{solution.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default UserSolution;
