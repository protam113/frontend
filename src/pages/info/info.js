import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../..'; // Đảm bảo đúng đường dẫn tới Context
import { Navigate, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();


    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                try {
                    const { data } = await axios.get("http://localhost:4000/api/user/user/me", {
                        withCredentials: true,
                    });
                    setUser(data.user);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUser();
        }, []);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:4000/api/user/user/logout", {
                withCredentials: true,
            });
            toast.success("Logged out successfully");
            setIsAuthenticated(false);
            navigateTo("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={user.avatar ? user.avatar.url : '/default-avatar.png'}
                        alt="Avatar"
                        className="w-32 h-32 object-cover rounded-full mb-4"
                    />
                    <h1 className="text-2xl font-semibold">{user.username}</h1>
                    <p className="text-gray-600">{user.role}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-medium">Personal Information</h2>
                    <p className="text-gray-800"><strong>Email:</strong> {user.email}</p>
                    <p className="text-gray-800"><strong>Phone:</strong> {user.phone}</p>
                    <p className="text-gray-800"><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
                </div>
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
