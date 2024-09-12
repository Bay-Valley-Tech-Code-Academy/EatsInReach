"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Slider from "react-slick";


// Import css files for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    
    const settings = {
            
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,

    };

    return (
        <div className="min-h-screen bg-Almond">
            <Navbar />
            <div className="container p-10 mt-4 mx-auto rounded-3xl bg-Yellow-Green">
                <h1 className="text-3xl font-bold mb-4 text-black">Featured Restaurants</h1>
                <Slider {...settings}>
                    {restaurants.slice(0, 5).map(restaurant => (
                        <div key={restaurant.restaurant_id}>
                            <img
                                src={`/images/${restaurant.image_url}`}
                                alt={`Image of ${restaurant.name}`}
                                className="w-full h-64 object-cover"
                            />
                            <div className="bg-white p-4">
                                <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                                <p>{restaurant.food_type}</p>
                            </div>
                        </div>
                    ))}
                </Slider>

                <h2 className="text-2xl font-bold my-4 text-black">All Restaurants</h2>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
                    {restaurants.map(restaurant => (
                        <div key={restaurant.restaurant_id} className="bg-white shadow-md rounded-3xl overflow-hidden flex">
                            <Link href={`/Pages/Restaurants/${restaurant.restaurant_id}`} className="flex">
                                <img
                                    src={`/images/${restaurant.image_url}`}
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
                <Link href="/" className="bg-Kobicha text-rosey-brown rounded-lg hover:bg-Chocolate-cosmos hover:text-white mt-4 inline-block px-6 py-3 text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:-translate-y-1 scale-105">
                    Home
                </Link>
            </div>
        </div>
    );
}
