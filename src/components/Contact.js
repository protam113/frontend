import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiMailSend, BiLocationPlus } from 'react-icons/bi';
import { PhoneCall } from 'react-feather';
import { toast } from 'react-toastify';

const Contact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessages] = useState('');
    const [contactData, setContactData] = useState({
        email: '',
        phone: '',
        address: '',
        mainImage: ''
    });

    const fetchContactData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/info/6653de4fc331853f432df898');
            setContactData(res.data);
        } catch (error) {
            console.error('Error fetching contact data:', error);
            toast.error('Failed to fetch contact data');
        }
    };

    useEffect(() => {
        fetchContactData();
    }, []);

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:4000/api/message/send',
                { name, phone, message },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success(res.data.message);
            setName('');
            setPhone('');
            setMessages('');
        } catch (error) {
            console.error('Error during message sending:', error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="md:w-1/2">
                    {/* Message section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-lg font-semibold mb-4">
                            Feel free to reach out through the contact form or
                        </p>
                        <img src={contactData.mainImage.url} alt="" className="w-60 h-auto mb-4" />
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <BiMailSend className="text-xl mr-2" />
                                {contactData.email}
                            </li>
                            <li className="flex items-center">
                                <PhoneCall className="text-xl mr-2" />
                                {contactData.phone}
                            </li>
                            <li className="flex items-center">
                                <BiLocationPlus className="text-xl mr-2" />
                                {contactData.address}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="md:w-1/2">
                    {/* Form section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <form className="space-y-4" onSubmit={handleMessage}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-400"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-400"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="messages"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Write your messages here
                                </label>
                                <textarea
                                    id="messages"
                                    name="messages"
                                    placeholder="Enter your messages"
                                    required
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-blue-400"
                                    value={message}
                                    onChange={(e) => setMessages(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-700 focus:outline-none focus:bg-red-700"
                            >
                                Submit now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
