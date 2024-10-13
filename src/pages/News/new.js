import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

const New = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postsPerPage] = useState(5); // số bài viết mỗi trang

    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/new/getAll", { withCredentials: true });
                // Sắp xếp tin tức theo ngày tạo mới nhất
                const sortedNews = data.news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setNews(sortedNews);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching news:", error.response.data.message);
            }
        };
        fetchNews();
    }, []);

    
    // Tính toán chỉ số của bài viết hiện tại
    const indexOfLastPost = page * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

    // Thay đổi trang
    const paginate = (pageNumber) => {
        navigate(`?page=${pageNumber}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <BounceLoader color="#dc2626" loading={loading} size={50} />
            </div>
        );
    }

    if (!news) {
        return <div>Error loading news detail...</div>;
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-3 news-container grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentPosts && currentPosts.length > 0 ? (
                            currentPosts.map((item) => (
                                <div key={item._id} className="news-card bg-white border border-gray-200 rounded-lg shadow p-4">
                                    <img src={item.image && item.image.url} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                                    <h3 className="text-xl font-bold mt-4">{item.caption}</h3>
                                    <p className="text-gray-700 mt-2">{item.title}</p>
                                    <Link to={`/news/news_detail/${item._id}`} className="text-blue-600 mt-4 block">Read more</Link>
                                </div>
                            ))
                        ) : (
                            <div className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 text-center">No News Found!</div>
                        )}
                    </div>
                    <div className="recent-news bg-white border border-gray-200 rounded-lg shadow p-4">
                        <h3 className="text-xl font-bold mb-4">Recent News</h3>
                        <ul className="space-y-4">
                            {news.slice(0, 5).map(item => (
                                <li key={item._id}>
                                    <Link to={`/news/news_detail/${item._id}`} className="text-blue-600">{item.caption}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={news.length}
                        paginate={paginate}
                        currentPage={page}
                    />
                </div>
            </div>
        </div>
    );
}

// Component phân trang
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
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

export default New;
