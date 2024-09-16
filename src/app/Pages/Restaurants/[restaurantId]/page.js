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
                if (!response.ok) {
                    throw new Error("Failed to fetch restaurant");
                }
                const data = await response.json();
                setRestaurant(data);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
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
        <div className="min-h-screen flex flex-col bg-Almond">
            <header className="w-full">
                <Navbar />
            </header>

            {/* Main Content Section */}
            <main className="flex-grow w-full max-w-6xl mx-auto p-4">
                <section className="mb-4 p-2">
                    <h1 className="text-3xl font-bold text-center text-black">
                        {restaurant.name}
                    </h1>
                </section>

                {/* Restaurant Content */}
                <section className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Image Section */}
                    <div className="relative w-full md:w-1/3 p-2 flex-shrink-0">
                        <img
                            src={restaurant.image_url}
                            alt={`${restaurant.name} main dish`}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>

                    {/* Restaurant Details */}
                    <div className="w-full md:w-2/3 flex flex-col gap-6">
                        {/* Contact Information */}
                        <div className="w-full p-2">
                            <div className="p-3 border border-gray-300 rounded-lg shadow-md" style={{ backgroundColor: '#AAD15F' }}>
                                <h2 className="text-2xl font-bold mb-2 text-black">
                                    Contact Information
                                </h2>
                                <p className="text-lg mb-6 text-black">
                                    <span className="font-semibold">Phone:</span>{" "}
                                    {restaurant.phone_number}
                                </p>
                                <p className="text-lg mb-6 text-black">
                                    <span className="font-semibold">Email:</span>{" "}
                                    {restaurant.email}
                                </p>
                                <p className="text-lg text-black">
                                    <span className="font-semibold">Address:</span>{" "}
                                    {restaurant.address}
                                </p>
                            </div>
                        </div>

                        {/* Price Range and Other Details */}
                        <div className="w-full p-2">
                            <div className="p-3 border border-gray-300 rounded-lg shadow-md" style={{ backgroundColor: '#AAD15F' }}>
                                <h2 className="text-2xl font-bold mb-2 text-black">
                                    Restaurant Details
                                </h2>
                                <p className="text-lg mb-6 text-black">
                                    <span className="font-semibold">Price Range:</span>{" "}
                                    {restaurant.price_range}
                                </p>
                                <p className="text-lg text-black">
                                    <span className="font-semibold">Food Type:</span>{" "}
                                    {restaurant.food_type}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Back Button */}
                <section className="mt-4">
                    <a
                        href="/Pages/Restaurants"
                        className="bg-Kobicha text-rosey-brown rounded-lg hover:bg-Chocolate-cosmos hover:text-white px-6 py-3 text-sm font-semibold shadow-lg transition-transform transform hover:-translate-y-1"
                    >
                        Back to Restaurants
                    </a>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white mt-10">
                <Footer />
            </footer>
        </div>
    );
}
