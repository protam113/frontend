import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BounceLoader } from 'react-spinners'; 

const NewDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [recentNews, setRecentNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/new/${id}`, { withCredentials: true });
                setNewsItem(data.news);
            } catch (error) {
                console.error("Error fetching news detail:", error.response.data.message);
            }
        };

        const fetchRecentNews = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/new/getAll", { withCredentials: true });
                setRecentNews(data.news.slice(0, 5));
            } catch (error) {
                console.error("Error fetching recent news:", error.response.data.message);
            }
        };

        // Thêm setState để ẩn loading khi dữ liệu đã được load
        const fetchData = async () => {
            await fetchNewsDetail();
            await fetchRecentNews();
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                {/* Sử dụng ClipLoader từ react-spinners */}
                <BounceLoader color="#dc2626" loading={loading} size={50} />
            </div>
        );
    }

    if (!newsItem) {
        return <div>Error loading news detail...</div>;
    }


    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-3 detail-container grid grid-cols-1 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                            <img src={newsItem.image && newsItem.image.url} alt={newsItem.title} className="w-full h-auto object-cover rounded-lg" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                            <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
                            <p className="text-gray-700 mb-4"><strong>{newsItem.caption}</strong></p>
                            <p className="text-gray-700 mb-4">{newsItem.desc}</p>
                            <div className="img-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                {/* Sử dụng thuộc tính image1, image2 nếu có */}
                                {newsItem.image1 && <img src={newsItem.image1.url} alt="Sub img 1" className="w-full h-auto object-cover rounded-lg" />}
                                {newsItem.image2 && <img src={newsItem.image2.url} alt="Sub img 2" className="w-full h-auto object-cover rounded-lg" />}
                            </div>
                            <p className="text-gray-700">{newsItem.content}</p>
                        </div>
                    </div>
                    <div className="recent-news bg-white border border-gray-200 rounded-lg shadow p-4">
                        <h3 className="text-xl font-bold mb-4">Recent News</h3>
                        <ul className="space-y-4">
                            {recentNews.map(item => (
                                <li key={item._id}>
                                    <a href={`/news/news_detail/${item._id}`} className="text-blue-600">{item.caption}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewDetail;
