"use client";
import { useState, useEffect } from 'react';

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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <img src={restaurant.image_url} alt={`${restaurant.name} main dish`} />
            <p>Location: {restaurant.location}</p>
            <p>Price Range: {restaurant.price_range}</p>
            <p>Food Type: {restaurant.food_type}</p>
            <p>Hours: {restaurant.hours_of_operation}</p>
            <p>Description: {restaurant.description}</p>
        </div>
    );
}
