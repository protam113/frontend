import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUsForm = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointment_date: '',
    title: '',
    status: 'Pending', // Default status
  });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:4000/api/appointment/post', formData, {
        withCredentials: true,
    });
        toast.success(response.data.message);
        setFormData({
        name: '',
        email: '',
        phone: '',
        appointment_date: '',
        title: '',
        status: 'Pending',
        });
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
            required 
        />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
            required 
        />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">Phone</label>
            <input 
            type="text" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
            required 
        />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="appointment_date">Appointment Date</label>
            <input 
            type="datetime-local" 
            id="appointment_date" 
            name="appointment_date" 
            value={formData.appointment_date} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
            required 
        />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Title</label>
            <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
