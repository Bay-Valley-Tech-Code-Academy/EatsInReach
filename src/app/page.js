"use client";

import Navbar from "./Components/Navbar";
import Link from "next/link";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col items-center">
        <h1 className="mt-20 text-8xl">Eats in Reach</h1>
        <h2>Reach for Flavor, Anytime</h2>
        <div>
          <Link href="/Pages/LoginUser">
            <button>User Login</button>
          </Link>
          <Link href="/Pages/LoginUser">
            <button>Vendor Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
