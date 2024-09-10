"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';

export default function RestaurantPage() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        async function fetchRestaurants() {
            const res = await fetch('/api/restaurants');
            const data = await res.json();
            setRestaurants(data);
        }

        fetchRestaurants();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {restaurants.map(restaurant => (
                        <div key={restaurant.restaurant_id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <Link href={`/Pages/Restaurants/${restaurant.restaurant_id}`}>
                                <img
                                    src={restaurant.image_url}
                                    alt={`Image of ${restaurant.name}`}
                                    className="w-full h-48 object-cover cursor-pointer"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                                    <p className="text-gray-600 mb-2">Location: {restaurant.location}</p>
                                    <p className="text-gray-600 mb-2">Price Range: {restaurant.price_range}</p>
                                    <p className="text-gray-600 mb-2">Food Type: {restaurant.food_type}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">Home</Link>
            </div>
        </div>
    );
}
