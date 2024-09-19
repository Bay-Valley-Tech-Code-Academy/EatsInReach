"use client";

import Navbar from "@/Components/Navbar";
import FavoritesCard from "@/Components/FavoritesCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import Footer from "@/Components/Footer";

export default function Favorites() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

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
    if (currentUser) {
      const fetchUserData = async () => {
        const collections = ["users", "vendors", "admins"];
        let found = false;

        for (const collection of collections) {
          if (found) break;

          try {
            const userDoc = await getDoc(
              doc(firestore, collection, currentUser.uid)
            );

            if (userDoc.exists()) {
              const userData = userDoc.data();
              if (userData.role !== 'user') {
                router.push("/");
              }
              found = true;
              setRole(userData.role);
            }
          } catch (error) {
            console.error(
              `Error fetching user data from ${collection} collection:`,
              error
            );
          }
        }

        if (!found) {
          console.log(
            "User document does not exist in any of the collections."
          );
          setRole(null);
        }
        setIsRoleLoading(false);
      };

      fetchUserData();
    }

    const fetchFavorites = async () => {
        if (currentUser && currentUser.user_id) {
        try {
            const response = await fetch(`/api/favorites?user_id=${currentUser.user_id}`);
            if (response.ok) {
              const data = await response.json();
              setFavorites(data);
            } else {
              console.error("Failed to fetch favorite restaurants");
            }
          } catch (error) {
            console.error("Error fetching favorite restaurants", error);
          }
        }
      };
  
    fetchFavorites();

  }, [currentUser, loading, router]);

  // Show a loading indicator or null while checking auth state
  if (loading || isRoleLoading) {
    return <div>Loading...</div>; // Replace with a loading spinner if needed
  }

  if (!currentUser || role !== "user") {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="text-4xl font-semibold text-center w-full px-16 mt-12">
          Favorites
        </div>
        <div className="flex flex-wrap gap-6 justify-center max-w-screen mx-auto px-4 mt-8">
          {favorites.map((restaurant, index) => (
            <FavoritesCard
              key={restaurant.restaurant_id}
              restaurantTitle={restaurant.name}
              restaurantImg={restaurant.image_url}
            />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
