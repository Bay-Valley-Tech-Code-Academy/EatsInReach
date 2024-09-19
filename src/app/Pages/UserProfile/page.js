"use client";
import Link from "next/link";
import Navbar from "@/Components/Navbar";




export default function LoginVendor() {
  return (
    <div>
      <Navbar />
        <div className="flex bg-green-300 justify-center ">
            <h1>Acount Setting</h1>
        </div>

 {/*Main Components*/}

 
      
        {/* sidebar */}
        <div className="flex ml-3 mt-3 justify-between">
        <div className="flex bg-gray-200 w-52"> 
        <ul>
            <li>Account Settings</li>
        </ul>
        </div>

        {/* Sidebar content */}
        <div className="flex h-96 w-1/2 flex-col mt-4">
            <h1>Flavor Profile</h1>
            {/* About me/What do you like to eat? */}
        
            <div className=" bg-green-300 justify-center">
            
           
            </div>
            </div>
            {/* Top three favorites */}            
        </div>
    </div>
  );
}
