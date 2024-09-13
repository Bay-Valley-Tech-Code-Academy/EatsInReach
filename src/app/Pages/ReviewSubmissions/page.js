"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function ReviewSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const response = await fetch('/api/vendor-submissions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const text = await response.text(); // Get the response as text
                const data = text ? JSON.parse(text) : []; // Parse it as JSON if not empty
                setSubmissions(data);
            } catch (err) {
                console.error('Failed to fetch submissions:', err);
                setError('Failed to load submissions. Please try again later.');
            }
        }

        fetchSubmissions();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
    <body className="bg-[#FDE4CE]">
        <Navbar/>
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Review Submissions</h1>
            {submissions.length > 0 ? (
                <ul>
                    {submissions.map((submission) => (
                        <li key={submission.submission_id} className="mb-4 p-4 border border-gray-300 rounded">
                            <h2 className="text-xl font-bold">{submission.name}</h2>
                            <p><strong>Location:</strong> {submission.location}</p>
                            <p><strong>Price Range:</strong> {submission.price_range}</p>
                            <p><strong>Food Type:</strong> {submission.food_type}</p>
                            <p><strong>Hours of Operation:</strong> {submission.hours_of_operation}</p>
                            <p><strong>Description:</strong> {submission.description}</p>
                            <p><strong>Phone Number:</strong> {submission.phone_number}</p>
                            <p><strong>Email:</strong> {submission.email}</p>
                            <p><strong>Image URL:</strong> <a href={submission.image_url} target="_blank" rel="noopener noreferrer">{submission.image_url}</a></p>
                            {/* Add buttons for approving or rejecting the submission */}
                            <button className='rounded-full text-white bg-[#AAD15F] px-4 py-1 m-2 border border-gray-300'>Accept</button>
                            <button className='rounded-full text-white bg-[#D22701] px-4 py-1 m-2 border border-gray-300'>Reject</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No submissions to review at this time.</p>
            )}
            <Link href="/">
            <button className='rounded-full text-white bg-[#FF670E] px-4 py-1 border border-gray-300'>Home</button>
            </Link>
        </div>
        <Footer/>
    </body>
    );
}
