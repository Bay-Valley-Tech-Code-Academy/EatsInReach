"use client";

import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { PiHeartStraightThin, PiHeartStraightFill } from "react-icons/pi";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../../firebase";
import { useAuth } from "../../../../../context/authContext";

export default function RestaurantPageId({ params }) {
  const [error, setError] = useState(null);
  const { currentUser, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [menu, setMenu] = useState(null);
  const { restaurantId } = params;

  // Fetch vendor items on component mount
  useEffect(() => {
    console.log("Fetching restaurant with ID:", restaurantId);

    async function fetchRestaurant() {
      try {
        const response = await fetch(`/api/restaurants/${restaurantId}`);
        console.log("API Response:", response);

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

  useEffect(() => {
    if (!loading && !currentUser) {
      return;
    }

    async function fetchFavoriteStatus() {
      try {
        const response = await fetch(
          `/api/favorites?user_id=${currentUser.uid}&restaurant_id=${restaurantId}`
        );
        if (response.ok) {
          const { isFavorited } = await response.json(); // Expecting a JSON with isFavorited property
          setIsFavorited(isFavorited);
        } else {
          throw new Error("Failed to fetch favorite status");
        }
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    }

    const fetchUserRoleAndFavorite = async () => {
      if (currentUser) {
        try {
          const collections = ["users", "vendors", "admins"];
          let found = false;

          // Fetch user role
          for (const collection of collections) {
            if (found) break;

            try {
              const userDoc = await getDoc(
                doc(firestore, collection, currentUser.uid)
              );

              if (userDoc.exists()) {
                const userData = userDoc.data();
                found = true;
                setRole(userData.role);
                await fetchFavoriteStatus(currentUser.uid, restaurantId);
              }
            } catch (error) {
              console.error(
                `Error fetching user data from ${collection} collection:`,
                error
              );
            }
          }

          if (!found) {
            console.error(
              "User document does not exist in any of the collections."
            );
            setRole(null);
          }

        } catch (error) {
          console.error("Error fetching user role or favorites", error);
        }
      }
    };

    fetchUserRoleAndFavorite();
  }, [currentUser, loading, restaurantId]);

  const handleFavoriteToggle = async () => {
    const url = `/api/favorites`;
    const method = isFavorited ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.uid,
          restaurant_id: restaurantId,
        }),
      });
      if (response.ok) {
        setIsFavorited(!isFavorited);
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating favorite status", error);
    }
  };
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`/api/menu`);
        const data = await res.json();
        setMenu(data);
        console.log(menu);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }

    if (restaurantId) {
      fetchMenu();
    }
  }, []);

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-lg text-black">
        Loading...
      </div>
    );
  }
  // toggles menu accordion
  const toggleMenuAccordion = () => {
    setMenuOpen(!menuOpen);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-lg text-black">
        <p>Error: {error}</p>
      </div>
    );
  }

  const justMenuItems = menu
    ? menu.filter(
        (menuSection) =>
          Number(menuSection.restaurant_id) === Number(restaurantId)
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-Almond">
      <header className="w-full">
        <Navbar />
      </header>
      <main className="flex-grow w-full max-w-6xl mx-auto p-4 bg-white">
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
              src={restaurant.image_url || "/default-image.jpg"} // Provide a default image if URL is missing
              alt={`${restaurant.name} main dish`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          {/* Restaurant Details */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            {/* Contact Information */}
            <div className="w-full p-2">
              <div
                className="p-3 border border-gray-300 rounded-lg shadow-md"
                style={{ backgroundColor: "#AAD15F" }}
              >
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
            <div className="w-full p-2 ">
              <div className="p-3 border border-gray-300 rounded-lg shadow-md bg-white hover:bg-slate-300">
                <h2 className="text-2xl font-bold mb-2 text-black">
                  Restaurant Details
                </h2>
                <p className="text-lg mb-4 text-black">
                  <span className="font-semibold">Price Range:</span>{" "}
                  {restaurant.price_range}
                </p>
                <p className="text-lg mb-4 text-black">
                  <span className="font-semibold">Rating:</span>{" "}
                  {restaurant.rating || "N/A"}
                </p>
                <p className="text-lg mb-4 text-black">
                  <span className="font-semibold">Food Type:</span>{" "}
                  {restaurant.food_type}
                </p>
              </div>
            </div>
            {/* Accordion for Menu */}
            <div className="w-full p-2">
              <div className="p-3 border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={toggleMenuAccordion} // Toggle the accordion
                    className="flex justify-between w-full px-4 py-2 text-left text-2xl font-bold mb-2 text-black bg-gray-100 rounded-lg focus:outline-none"
                  >
                    {menuOpen ? "Hide Menu" : "Show Menu"}
                    <span
                      className={`transform transition-transform duration-300 ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {menuOpen && (
                    <div className="p-4 border-t border-gray-200">
                      {justMenuItems && justMenuItems.length > 0 ? (
                        justMenuItems.map((menuSection, index) => (
                          <div key={index} className="mb-6">
                            {/* Menu Section Title */}
                            <h3 className="text-2xl font-bold text-black mb-2">
                              {menuSection.menu_name} {/* Section Name */}
                            </h3>
                            <p className="text-lg text-gray-600 mb-4">
                              {menuSection.menu_desc}
                              {/* Section Description */}
                            </p>
                            {/* Menu Items */}
                            <ul className="space-y-4">
                              {menuSection.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex flex-col text-black">
                                  {/* Item Name and Price */}
                                  <div className="flex justify-between">
                                    <span className="font-semibold">{item.name}</span>
                                    <span>${item.price}</span>
                                  </div>

                                  {/* Item Description */}
                                  {item.description && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      {item.description}
                                    </p>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <p>No menu available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Back Button */}
        <section className="mt-4 flex">
          <a
            href="/Pages/Restaurants"
            className="bg-Kobicha text-rosey-brown rounded-lg hover:bg-Chocolate-cosmos hover:text-white px-6 py-3 text-sm font-semibold shadow-lg transition-transform transform hover:-translate-y-1"
          >
            Back to Restaurants
          </a>
          {currentUser && role === "user" && (
            <div
              onClick={handleFavoriteToggle}
              className="cursor-pointer text-3xl flex items-center ml-32"
            >
              {isFavorited ? <PiHeartStraightFill /> : <PiHeartStraightThin />}
            </div>
          )}
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-white mt-10">
        <Footer />
      </footer>
    </div>
  );
}
