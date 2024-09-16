"use client";

import Navbar from "./Components/Navbar";
import Link from "next/link";
import { Italiana } from "next/font/google";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import Footer from "@/Components/Footer"

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Landing() {
  const { currentUser } = useAuth();
  const [role, setRole] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col items-center landing-page">
        <h1
          className={`mt-20 text-6xl sm:text-8xl md:text-9xl landing-header ${italiana.className}`}
        >
          Eats in Reach
        </h1>
        <h2 className="text-2xl sm:text-4xl md:text-5xl mt-4">
          Reach for Flavor, Anytime
        </h2>
        {!currentUser && (
          <div className="mt-20">
            <Link href="/Pages/Login">
              <button className="text-1xl sm:text-2xl md:text-3xl bg-[#AAD15F] hover:bg-[#8A9C4C] p-3 sm:p-4 md:p-5 rounded-full border border-black">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
