import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null); // Thêm trạng thái cho avatar

    const navigateTo = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            setAvatar(e.target.files[0]); // Lưu hình ảnh vào trạng thái
        } else {
            switch (e.target.name) {
                case 'username':
                    setUsername(e.target.value);
                    break;
                case 'email':
                    setEmail(e.target.value);
                    break;
                case 'phone':
                    setPhone(e.target.value);
                    break;
                case 'dob':
                    setDob(e.target.value);
                    break;
                case 'password':
                    setPassword(e.target.value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(); // Tạo đối tượng FormData
            formData.append('username', username);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('dob', dob);
            formData.append('password', password);
            formData.append('avatar', avatar); // Thêm hình ảnh vào FormData

            const response = await axios.post(
                "http://localhost:4000/api/user/register",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            toast.success(response.data.message);
            setIsAuthenticated(true);
            navigateTo("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-semibold mb-4">Register</h2>
                <form onSubmit={handleRegistration}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={dob}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 focus:outline-none">Register</button>
                    </div>
                    <div>
                        <p>Already have an account?</p>
                        <Link to="/login" className="text-blue-700">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

