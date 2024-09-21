// src/app/Pages/Restaurants/page.js

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/Navbar";
import Slider from "react-slick";
import Footer from "@/Components/Footer";

// Import css files for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");

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
    pauseOnHover: true, // This pauses autoplay when hovered
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

  useEffect(() => {
    if (sortBy === "Price_asc") {
      setFilteredRestaurants(
        [...filteredRestaurants].sort(
          (a, b) => a.price_range.length - b.price_range.length
        )
      );
    }
    if (sortBy === "Price_desc") {
      setFilteredRestaurants(
        [...filteredRestaurants].sort(
          (a, b) => b.price_range.length - a.price_range.length
        )
      );
    }
    if (sortBy === "Food_Type") {
      setFilteredRestaurants([...filteredRestaurants].sort((a, b) => a.food_type.localeCompare(b.food_type)));  //a.food_type.localeCompare(b.food_type))
    }
  }, [sortBy, filteredRestaurants]);

  return (
    <div className="min-h-screen bg-[#FDFBCE]">
      <Navbar />
      <div className="rounded-[84px]">
        <div className="container mx-auto my-16 px-24 pt-3 pb-6 max-sm:px-1 rounded-[164px] max-sm:rounded-[84px] bg-Yellow-Green w-4/6 max-sm:w-5/6">
          <Slider {...settings} className="container mt-4 max-sm:w-full">
            {restaurants.slice(0, 5).map((restaurant) => (
              <div
                key={restaurant.restaurant_id}
                className="rounded-t-[84px] overflow-hidden"
              >
                <img
                  src={`/images/${restaurant.image_url}`}
                  alt={`Image of ${restaurant.name}`}
                  className="w-full h-64 object-cover rounded-3x1 "
                />
                <div className="bg-white p-4 rounded-b-full pl-16">
                  <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                  <p>{restaurant.food_type}</p>
                  <p>{restaurant.price_range_id}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex items-center max-w-sm mx-auto mt-8">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>

          <div className="relative w-full">
            <div className="absolute inset-y-0 -start-0 flex items-center ps-3">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>

                {isDropdownOpen && (
                  <div className="absolute bg-white shadow-md rounded-md mt-2 w-48">
                    <ul className="py-2">
                      <li
                        className="px-4 py-2 hover:bg-gray-100"
                        onClick={() => setSortBy("Price_asc")}
                      >
                        Price asc
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100"
                        onClick={() => setSortBy("Price_desc")}
                      >
                        {" "}
                        Price desc
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100"
                        onClick={() => setSortBy("Food_Type")}
                      >
                        {" "}
                        Food_type
                      </li>

                      <li>
                        Rating NOT IMPLEMENTED NEED TO DO WHEN RATINGS ARE
                        IMPLEMENTED
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="simple-search"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Search..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-Yellow-Green bg-Almond rounded-lg border hover:bg-Kobicha hover:text-rosey-brown focus:ring-4 focus:outline-none"
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

        <h2 className="text-2xl my-4 text-zinc-800 px-16 text-center">
          All Restaurants
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-4 p-16">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div className="bg-Yellow-Green p-3 rounded-3xl group">
                <div
                  key={restaurant.restaurant_id}
                  className="bg-white shadow-md rounded-3xl overflow-hidden flex"
                >
                  <Link
                    href={`/Pages/Restaurants/${restaurant.restaurant_id}`}
                    className="flex max-lg:block"
                  >
                    <img
                      src={`/images/${restaurant.image_url}`}
                      alt={`Image of ${restaurant.name}`}
                      className="w-1/2 h-52 object-cover cursor-pointer max-lg:w-auto"
                    />
                    <div className=" lg:w-1/2  group-hover:bg-slate-300 group-hover:translate-y-1">
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
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-black">
              No restaurants match your search.
            </p>
          )}
        </div>
        <div className="px-16 py-8">
          <Link
            href="/"
            className="bg-Kobicha text-rosey-brown rounded-lg hover:bg-Chocolate-cosmos hover:text-white mt-4 inline-block px-6 py-3 text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:-translate-y-1 scale-105"
          >
            Home
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
