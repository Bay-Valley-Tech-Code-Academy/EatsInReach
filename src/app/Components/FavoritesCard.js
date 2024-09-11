"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PiHeartStraightThin  } from "react-icons/pi";
import { PiHeartStraightFill } from "react-icons/pi";
import Image from 'next/image'; 

export default function FavoritesCard({ restaurantImg, restaurantTitle }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleIconClick = () => {
    setIsFavorited(!isFavorited);
  };

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
                <div onClick={handleIconClick} className="cursor-pointer ml-auto text-2xl text-right">
                  {isFavorited ? (
                    <PiHeartStraightFill />
                  ) : (
                    <PiHeartStraightThin />
                  )}
                </div>
            </div>
        </div>
    </div>
  );
}