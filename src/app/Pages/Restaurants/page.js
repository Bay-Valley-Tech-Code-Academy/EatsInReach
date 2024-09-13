"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/Navbar";
import Slider from "react-slick";

// Import css files for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      const res = await fetch("/api/restaurants");
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

  // Handle search query and filter the restaurants based on name, location, etc.
  useEffect(() => {
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchQuery, restaurants]);

  return (
    <div className="min-h-screen bg-Almond">
      <Navbar />
      <div className="container p-10 mt-4 mx-auto rounded-3xl bg-Yellow-Green">
        <h1 className="text-3xl font-bold mb-4 text-black">
          Featured Restaurants
        </h1>
        <Slider {...settings}>
          {restaurants.slice(0, 5).map((restaurant) => (
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

        <div className="flex items-center max-w-sm mx-auto mt-8">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>

        <h2 className="text-2xl font-bold my-4 text-black">All Restaurants</h2>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.restaurant_id}
              className="bg-white shadow-md rounded-3xl overflow-hidden flex"
            >
              <Link
                href={`/Pages/Restaurants/${restaurant.restaurant_id}`}
                className="flex"
              >
                <img
                  src={`/images/${restaurant.image_url}`}
                  alt={`Image of ${restaurant.name}`}
                  className="w-1/2 h-auto object-cover cursor-pointer"
                />
                <div className="p-4 w-1/2 hover:bg-slate-300 hover:translate-y-1">
                  <h2 className="text-gray-700 text-xl font-semibold mb-2">
                    {restaurant.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Location: {restaurant.location}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Price Range: {restaurant.price_range}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Food Type: {restaurant.food_type}
                  </p>
                </div>
                <Link href="/" className="bg-Kobicha text-rosey-brown rounded-lg hover:bg-Chocolate-cosmos hover:text-white mt-4 inline-block px-6 py-3 text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:-translate-y-1 scale-105">
                    Home
                </Link>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
                <div class="flex items-center max-w-sm mx-auto">   
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                            </svg>
                        </div>
                        <input type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                    </div>
                    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>

                {/* List of filtered restaurants */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <div key={restaurant.restaurant_id} className="p-4 border border-gray-300 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold text-black">{restaurant.name}</h2>
                                <p className="text-lg text-black"><strong>Location:</strong> {restaurant.location}</p>
                                <p className="text-lg text-black"><strong>Food Type:</strong> {restaurant.food_type}</p>
                                <p className="text-lg text-black"><strong>Price Range:</strong> {restaurant.price_range}</p>
                                <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-auto mt-4 rounded" />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg text-black">No restaurants match your search.</p>
                    )}
                </section>
                <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">Home</Link>
            </div>
        </div>
    );
}