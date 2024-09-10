"use client";

import Link from 'next/link';
import { PiHeartStraightThin  } from "react-icons/pi";
import Image from 'next/image'; 

export default function RestaurantCard({ restaurantImg, restaurantTitle }) {
  return (
    <div>
        <div className="w-auto flex flex-col justify-center items-center">
            <Image src={restaurantImg} 
                alt={restaurantTitle} 
                width={250} height={100} 
                className="rounded-md"  
            />
            <div className="flex gap-2 w-full p-1">
                <p className="text-left">{restaurantTitle}</p>
                <PiHeartStraightThin className="text-xl text-right ml-auto" />
            </div>
        </div>
    </div>
  );
}