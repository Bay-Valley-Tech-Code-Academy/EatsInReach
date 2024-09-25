"use client"

import Navbar from '@/Components/Navbar'
import { useState } from 'react'
import Link from 'next/link';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitForm, setSubmitForm] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmitForm(true);
            } else {
                setError('Failed to send message.');
            }
        } catch (error) {
            console.error('Error submitting form', error);
            setError('Failed to send message');
        }
    };

    return(
        <div className="bg-Yellow-Green min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center gap-6">
                <div>
                    <p>Contact Us</p>
                    <p>Fill out the form and our term will get back to you as soon as possible.</p>
                    <p>EatsInReach@gmail.com</p>
                </div>
                <div className="bg-gray-100 mt-20 p-10 rounded-xl w-1/2">
                    <h3 className="text-center font-semibold text-xl">Get in Touch</h3>
                    {submitForm ? ( 
                        <p>Message sent successfully.</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block">Email</label>
                                <input
                                    type="email"
                                    className="w-full"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="bg-green-600 p-1 align-center w-full">Send Message</button>
                            {error && <p>{error}</p>}
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}