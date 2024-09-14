"use client"
import Link from 'next/link';
import Navbar from '@/Components/Navbar'
import FavoritesCard from '@/Components/FavoritesCard';

export default function Favorites() {
    const restaurantData = [
        {
            restaurantTitle: "Restaurant 1",
            restaurantImg: "/images/restaurantimg1.jpg",
        },
        {
            restaurantTitle: "Restaurant 2",
            restaurantImg: "/images/restaurantimg1.jpg",
        },
        {
            restaurantTitle: "Restaurant 1",
            restaurantImg: "/images/restaurantimg1.jpg",
        }
    ];

    return(
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center">
                <div className="text-4xl font-semibold text-center w-full px-16 mt-12">Favorites</div>
                <div className="flex flex-wrap gap-6 justify-center max-w-screen mx-auto px-4 mt-8">
                    {restaurantData.map((restaurant, index) => (
                        <FavoritesCard
                            key={index}
                            restaurantTitle={restaurant.restaurantTitle}
                            restaurantImg={restaurant.restaurantImg}
                        />
                    ))}
                </div>
            </div>
        </div>
        
    )
}