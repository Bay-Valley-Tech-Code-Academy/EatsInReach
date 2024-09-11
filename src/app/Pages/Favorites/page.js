"use client"
import Link from 'next/link';
import Navbar from '@/Components/Navbar'
import FavoritesCard from '@/Components/FavoritesCard';

export default function Bookmarks() {
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
        },
        {
            restaurantTitle: "Restaurant 2",
            restaurantImg: "/images/restaurantimg1.jpg",
        },
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
        },
        {
            restaurantTitle: "Restaurant 2",
            restaurantImg: "/images/restaurantimg1.jpg",
        },
        {
            restaurantTitle: "Restaurant 1",
            restaurantImg: "/images/restaurantimg1.jpg",
        },
        {
            restaurantTitle: "Restaurant 2",
            restaurantImg: "/images/restaurantimg1.jpg",
        },
    ];

    return(
        <div>
            <Navbar />
            <div className="flex flex-col items-center">
                <div className="text-2xl font-bold justify-start mt-8">Favorites</div>
                <Link href="/">Home</Link>
                <div className="flex flex-wrap gap-6 justify-center max-w-screen mx-auto px-4">
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