"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function RestaurantDetailPage() {
    const [restaurant, setRestaurant] = useState(null);
    const router = useRouter();
    const { restaurantId } = router.query;

    useEffect(() => {
        async function fetchRestaurant() {
            if (!restaurantId) return;
            const res = await fetch(`/api/restaurants/${restaurantId}`);
            const data = await res.json();
            setRestaurant(data);
        }

        fetchRestaurant();
    }, [restaurantId]);

    if (!restaurant) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
                <img
                    src={restaurant.image_url}
                    alt={`Image of ${restaurant.name}`}
                    className="w-full h-48 object-cover mb-4"
                />
                <p className="text-gray-600 mb-2">Location: {restaurant.location}</p>
                <p className="text-gray-600 mb-2">Price Range: {restaurant.price_range}</p>
                <p className="text-gray-600 mb-2">Food Type: {restaurant.food_type}</p>
                <p className="text-gray-600 mb-2">Hours of Operation: {restaurant.hours_of_operation}</p>
                <p className="text-gray-600 mb-2">Description: {restaurant.description}</p>
                <div className="flex flex-col space-y-4 mt-4">
                    <h2 className="text-2xl font-semibold">Menu</h2>
                    {restaurant.menu_images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Menu image ${index + 1}`}
                            className="w-full h-48 object-cover"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
