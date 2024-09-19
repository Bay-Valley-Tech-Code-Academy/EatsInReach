"use client";

import Navbar from "./Components/Navbar";
import Link from "next/link";
import { Italiana } from "next/font/google";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import Footer from "@/Components/Footer";

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Landing() {
  const { currentUser } = useAuth();
  const [role, setRole] = useState(null);

  // Example of hardcoded restaurant data (this would typically come from an API)
  const restaurants = [
    { name: "Pasta Palace", image_url: "pizza-2.jpg" },
    { name: "Sushi Central", image_url: "sushi-1.jpg" },
    { name: "Burger Bonanza", image_url: "burger-1.jpg" },
    { name: "Taco Town", image_url: "taco-1.jpg" },
    { name: "Steak House", image_url: "steak-1.jpg" }
  ];

  return (
    <div className ="">
     <Navbar />
<div className="w-full h-full flex flex-col items-center landing-page justify-start">
  <h1
    className={`mt-2 sm:mt-20 md:mt-24 p-4 text-6xl sm:text-8xl md:text-9xl landing-header ${italiana.className}`}
  >
    Eats in Reach
  </h1>
  <h2 className="text-2xl sm:text-4xl md:text-5xl">
    Reach for Flavor, Anytime
  </h2>
  {!currentUser && (
    <div className="mt-12 sm:mt-16 md:mt-20">
      <Link href="/Pages/Login">
        <button className="text-1xl sm:text-2xl md:text-3xl bg-[#AAD15F] hover:bg-[#8A9C4C] p-3 sm:p-4 md:p-5 rounded-full border border-black">
          Login
        </button>
      </Link>
    </div>
  )}
</div>


<div className="relative w-90  flex flex-col bg-Buff  items-center p-2 min-h-[calc(100vh-120px)] ">

  {/* Background image
  <div className="absolute top-0 w-full  flex flex-col min-h-[calc(100vh-120px)] h-screen -z-10">
    <img
      className="object-cover w-full h-full"
      src="https://c8.alamy.com/comp/PJ318C/fresh-farm-produce-organic-vegetables-on-wooden-pine-table-healthy-background-copy-space-for-text-top-view-selective-focus-PJ318C.jpg"
      alt="Farm produce"
    />
  </div> */}

  <div className ="flex flex-col justify-center  items-center ">

  <div className ="bg-Cream flex justify-center p-1 rounded-2xl w-40 hover:underline hover:-translate-y-1 z-10">

    {/* Our Favorites heading */}
    <h3 className="text-xl text-black ">
      Our Favorites
    </h3>

  </div>

  

  {/* Displaying restaurants dynamically */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 rounded-3xl gap-3 scrollbar-hidden z-10  h-screen overflow-y-auto p-1 ">
    {restaurants.slice(0, 5).map((restaurant, index) => (
      <div key={index} className="h-56 w-48 p-2 rounded-2xl">
        <img
          src={`/images/${restaurant.image_url}`}
          alt={`Image of ${restaurant.name}`}
          className="w-full h-36 object-cover rounded-xl cursor-pointer"
          loading="lazy"
        />
        <p className="w-full text-center bg-Yellow-Green mt-1 p-1 rounded-2xl hover:bg-yellow-green">
          {restaurant.name}
        </p>
      </div>))}

      </div>
  
  </div>

</div>



      <Footer/>
    </div>
  );
}

