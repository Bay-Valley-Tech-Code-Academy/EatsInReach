"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function RestaurantPage({ params }) {
    const [restaurant, setRestaurant] = useState(null);
    const { restaurantId } = params;

    useEffect(() => {
        console.log('Fetching restaurant with ID:', restaurantId);
        async function fetchRestaurant() {
            try {
                const response = await fetch(`/api/restaurants/${restaurantId}`);
                console.log('API Response:', response);
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurant');
                }
                const data = await response.json();
                console.log('Fetched Data:', data);
                setRestaurant(data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        }
    
        if (restaurantId) {
            fetchRestaurant();
        }
    }, [restaurantId]);
    

    if (!restaurant) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white text-lg text-black">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="w-full bg-white">
                <Navbar />
            </header>

            {/* Main Content Section */}
            <main className="flex-grow w-full max-w-6xl mx-auto p-4 bg-white">
                {/* Restaurant Name */}
                <section className="mb-4 p-2">
                    <h1 className="text-3xl font-bold text-center text-black">
                        {restaurant.name}
                    </h1>
                </section>

                {/* Restaurant Content */}
                <section className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Image Section with Hover Effect */}
                    <div className="relative w-full md:w-1/3 p-2 flex-shrink-0 group">
                        <img
                            src={restaurant.image_url}
                            alt={`${restaurant.name} main dish`}
                            className="w-full h-auto max-w-sm object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                            <p className="text-white text-lg px-3 py-1">
                                {restaurant.description}
                            </p>
                        </div>
                    </div>

                    {/* Restaurant Details Section */}
                    <div className="w-full md:w-2/3 flex flex-col gap-6">
                        {/* Contact Information */}
                        <div className="w-full p-2">
                            <div className="p-3 border border-gray-300 rounded-lg shadow-md bg-white">
                                <h2 className="text-2xl font-bold mb-2 text-black">Contact Information</h2>
                                <p className="text-lg mb-6 text-black">
                                    <span className="font-semibold">Phone:</span> {restaurant.phone}
                                </p>
                                <p className="text-lg mb-6 text-black">
                                    <span className="font-semibold">Email:</span> {restaurant.email}
                                </p>
                                <p className="text-lg text-black">
                                    <span className="font-semibold">Address:</span> {restaurant.address}
                                </p>
                            </div>
                        </div>

                        {/* Price Range and Other Details */}
                        <div className="w-full p-2">
                            <div className="p-3 border border-gray-300 rounded-lg shadow-md bg-white">
                                <h2 className="text-2xl font-bold mb-2 text-black">Restaurant Details</h2>
                                <p className="text-lg mb-4 text-black">
                                    <span className="font-semibold">Price Range:</span> {restaurant.price_range}
                                </p>
                                <p className="text-lg mb-4 text-black">
                                    <span className="font-semibold">Rating:</span> {restaurant.rating}
                                </p>
                                <p className="text-lg mb-4 text-black">
                                    <span className="font-semibold">Food Type:</span> {restaurant.food_type}
                                </p>
                                <p className="text-lg text-black">
                                    <span className="font-semibold">Hours:</span> {restaurant.hours_of_operation}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full bg-white">
                <Footer />
            </footer>
        </div>
    );
}
