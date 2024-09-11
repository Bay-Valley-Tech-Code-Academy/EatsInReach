"use client";
import { useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function VendorSubmission() {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price_range: '',
        food_type: '',
        hours_of_operation: '',
        description: '',
        phone_number: '',
        email: '',
        image_url: ''
    });
    
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/vendor-submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setSubmitStatus('Submission successful! Your restaurant will be reviewed soon.');
            setFormData({
                name: '',
                location: '',
                price_range: '',
                food_type: '',
                hours_of_operation: '',
                description: '',
                phone_number: '',
                email: '',
                image_url: ''
            });
        } else {
            setSubmitStatus('There was an error with your submission. Please try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <Navbar />
            <h1 className="text-2xl font-bold mb-6">Submit Your Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Restaurant Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price Range</label>
                    <input 
                        type="text" 
                        name="price_range" 
                        value={formData.price_range} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Food Type</label>
                    <input 
                        type="text" 
                        name="food_type" 
                        value={formData.food_type} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Hours of Operation</label>
                    <input 
                        type="text" 
                        name="hours_of_operation" 
                        value={formData.hours_of_operation} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number</label>
                    <input 
                        type="text" 
                        name="phone_number" 
                        value={formData.phone_number} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input 
                        type="text" 
                        name="image_url" 
                        value={formData.image_url} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Submit
                </button>
            </form>
            {submitStatus && <p className="mt-4">{submitStatus}</p>}
        </div>
    );
}
