"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function ReviewSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch vendor submissions
                const submissionsResponse = await fetch('/api/vendor-submissions');
                if (!submissionsResponse.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                const submissionsData = await submissionsResponse.json();

                // Fetch food types and price ranges
                const foodTypesResponse = await fetch('/api/food-types');
                const priceRangesResponse = await fetch('/api/price-ranges');
                if (!foodTypesResponse.ok || !priceRangesResponse.ok) {
                    throw new Error('Failed to fetch food types or price ranges');
                }
                const [foodTypesData, priceRangesData] = await Promise.all([
                    foodTypesResponse.json(),
                    priceRangesResponse.json()
                ]);

                setFoodTypes(foodTypesData);
                setPriceRanges(priceRangesData);
                setSubmissions(submissionsData);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('Failed to load data. Please try again later.');
            }
        }

        fetchData();
    }, []);

    const getPriceRange = (id) => priceRanges.find((range) => range.price_range_id === id)?.range || 'Unknown';
    const getFoodType = (id) => foodTypes.find((type) => type.food_type_id === id)?.type_name || 'Unknown';

    if (error) {
        return <div className="m-5 max-w-lg mx-auto p-6 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <p>{error}</p>
        </div>;
    }

    return (
        <div className="bg-[#FDE4CE] min-h-screen flex flex-col">
            <Navbar />
            <div className="m-5 min-h-min items-center max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6">Review Submissions</h1>
                {submissions.length > 0 ? (
                    <ul>
                        {submissions.map((submission) => (
                            <li key={submission.submission_id} className="mb-4 p-4 border border-gray-300 rounded">
                                <h2 className="text-xl font-bold">{submission.name}</h2>
                                <p><strong>Location:</strong> {submission.location}</p>
                                <p><strong>Price Range:</strong> {getPriceRange(parseInt(submission.price_range_id))}</p>
                                <p><strong>Food Type:</strong> {getFoodType(parseInt(submission.food_type_id))}</p>
                                <p><strong>Hours of Operation:</strong> {submission.hours_of_operation}</p>
                                <p><strong>Description:</strong> {submission.description}</p>
                                <p><strong>Phone Number:</strong> {submission.phone_number}</p>
                                <p><strong>Email:</strong> {submission.email}</p>
                                <p><strong>Image URL:</strong> <a href={submission.image_url} target="_blank" rel="noopener noreferrer">{submission.image_url}</a></p>
                                <div className="flex justify-center">
                                    <button 
                                        className='rounded-full font-thin bg-[#AAD15F] px-4 py-1 mx-1 my-2 hover:bg-[#627937]'
                                        onClick={() => handleAction(submission.submission_id, 'accept')}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        className='rounded-full font-thin bg-[#D22701] px-4 py-1 mx-1 my-2 hover:bg-[#963a25]'
                                        onClick={() => handleAction(submission.submission_id, 'reject')}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No submissions to review at this time.</p>
                )}
                <Link href="/">
                    <button className='rounded-full font-thin bg-[#D9D9D9] px-4 py-1 border border-gray-300'>Home</button>
                </Link>
            </div>
            <Footer />
        </div>
    );
}
