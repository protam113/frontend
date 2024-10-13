import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Service = () => {
    const [recentNews, setRecentNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentNews = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/new/getAll");
                const sortedNews = data.news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecentNews(sortedNews.slice(0, 4));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recent news:", error);
            }
        };
        fetchRecentNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!recentNews) {
        return <div>Error loading recent news...</div>;
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                {/* Header */}
                <h1 className="text-3xl font-semibold mb-4">Dịch vụ của chúng tôi</h1>

                {/* Display Recent News */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
                    {recentNews.map(news => (
                        <div key={news._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <img src={news.image && news.image.url} alt={news.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                                <a href={`/news/news_detail/${news._id}`} className="text-blue-600 mt-4 block">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button to News Page */}
                <div className="flex justify-center mt-8">
                    <a href="/new" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5">
                        Xem tất cả tin tức
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Service;
