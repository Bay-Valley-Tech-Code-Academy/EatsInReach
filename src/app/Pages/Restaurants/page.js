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
            <div className="container mt-4 mx-auto p-4 rounded-3xl bg-gray-600">
                <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
                    {restaurants.map(restaurant => (
                        <div key={restaurant.restaurant_id} className="bg-white shadow-md rounded-3xl overflow-hidden flex">
                            <Link href={`/Pages/Restaurants/${restaurant.restaurant_id}`} className="flex">
                                <img
                                    src={restaurant.image_url}
                                    alt={`Image of ${restaurant.name}`}
                                    className="w-1/2 h-auto object-cover cursor-pointer"
                                />
                                <div className="p-4 w-1/2 hover:bg-slate-300 hover:translate-y-1">
                                    <h2 className="text-gray-700 text-xl font-semibold mb-2">{restaurant.name}</h2>
                                    <p className="text-gray-600 mb-2">Location: {restaurant.location}</p>
                                    <p className="text-gray-600 mb-2">Price Range: {restaurant.price_range}</p>
                                    <p className="text-gray-600 mb-2">Food Type: {restaurant.food_type}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <Link href="/" className="bg-white text-blue-500 rounded-lg hover:bg-gray-300 mt-4 inline-block px-6 py-3 text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:-translate-y-1 scale-105">
                    Home
                </Link>
            </div>
        </div>
    );
}
