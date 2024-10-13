import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoShareSocial } from "react-icons/io5";
import { BounceLoader } from 'react-spinners'; 

const DocumentDetail = () => {
    const { id } = useParams();
    const [documentItem, setDocumentItem] = useState(null);
    const [recentDocuments, setRecentDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocumentDetail = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/document/${id}`, { withCredentials: true });
                setDocumentItem(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching document detail:", error.response.data.message);
            }
        };

        const fetchRecentDocuments = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/document/getAll", { withCredentials: true });
                if (response && response.data && response.data.data) {
                    setRecentDocuments(response.data.data.slice(0, 5));
                } else {
                    console.error("Error fetching recent documents: Response data is invalid");
                }
            } catch (error) {
                console.error("Error fetching recent documents:", error.message);
            }
        };

        fetchDocumentDetail();
        fetchRecentDocuments();
    }, [id]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                {/* Sử dụng ClipLoader từ react-spinners */}
                <BounceLoader color="#dc2626" loading={loading} size={50} />
            </div>
        );
    }

    if (!documentItem) {
        return <div>Error loading news detail...</div>;
    }


    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-3 detail-container grid grid-cols-1 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                            <img src={documentItem.image && documentItem.image.url} alt={documentItem.caption} className="w-full h-auto object-cover rounded-lg" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                            <h1 className="text-3xl font-bold mb-4">{documentItem.caption}</h1>
                            <p className="text-gray-700 mb-4"><strong>{documentItem.intro}</strong></p>
                            <p className="text-gray-700 mb-4">{documentItem.paraOneDescription}</p>
                            <h2 className="text-2xl font-bold mb-2">{documentItem.paraOneTitle}</h2>
                            <p className="text-gray-700 mb-4">{documentItem.paraTwoDescription}</p>
                            <h2 className="text-2xl font-bold mb-2">{documentItem.paraTwoTitle}</h2>
                            <p className="text-blue-400 mb-4 flex items-center space-x-2">
                                <IoShareSocial className="inline-block" />
                                <a href={documentItem.link} target="_blank" rel="noopener noreferrer" className="inline-block">Link</a>
                            </p>
                            <div className="img-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                {documentItem.image1 && <img src={documentItem.image1.url} alt="Sub img 1" className="w-full h-auto object-cover rounded-lg" />}
                                {documentItem.image2 && <img src={documentItem.image2.url} alt="Sub img 2" className="w-full h-auto object-cover rounded-lg" />}
                            </div>
                        </div>
                    </div>
                    <div className="recent-documents bg-white border border-gray-200 rounded-lg shadow p-4">
                        <h3 className="text-xl font-bold mb-4">Recent Documents</h3>
                        <ul className="space-y-4">
                            {recentDocuments.map(item => (
                                <li key={item._id}>
                                    <a href={`/document/${item._id}`} className="text-blue-600">{item.caption}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentDetail;
