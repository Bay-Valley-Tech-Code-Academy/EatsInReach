"use client"

import Navbar from '@/Components/Navbar'
import FavoritesCard from '@/Components/FavoritesCard';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/authContext";

export default function Favorites() {
    const router = useRouter();
    const { currentUser, loading } = useAuth();

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

    useEffect(() => {
        // Redirect to the landing page if the user is not logged in
        if (!loading && !currentUser) {
          router.push("/");
        }
      }, [currentUser, loading, router]);
    
      // Show a loading indicator or null while checking auth state
      if (loading) {
        return <div>Loading...</div>; // Replace with a loading spinner if needed
      }
    
      if (!currentUser) {
        // While the redirect is taking place, we can also show a loading state
        return <div>Redirecting...</div>;
      }

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