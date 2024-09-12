"use client";

import { useState } from "react";
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[#3D3860]">
        <div>Navbar</div>
        <div>
            <div>
                <Link href="/Pages/Restaurants">Restaurants</Link>
            </div>
            <div>
                <Link href="/Pages/UserProfile">User Profile</Link>
            </div>
            <div>
              <Link href="/Pages/Favorites">Favorites</Link>
            </div>
        </div>
    </header>
  );
}