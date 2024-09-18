"use client";
import Link from "next/link";
import Navbar from "@/Components/Navbar";




export default function LoginVendor() {
  return (
    <div>
      <Navbar />
      <div className="flex bg-green-400 h-28 items-end"> {/* Profile image and background */}
        <div className=" bg-white border w-fit rounded-full ml-3">
            <img src="/images/profile-icon.png"
                height="15"
                width="25"
                alt="Profile picture"
                className="w-24 h-24  ">
            </img>
        </div>
      </div>

 {/*Main Components*/}

 
      
        {/* sidebar */}
        <div className="">
        <div className="bg-gray-200 w-52 "> 
        <ul>
            <li>Profile</li>
            <li>Favorites</li>

        </ul>
        </div>

        {/* Sidebar content */}
        <div className="flex h-screen w-full items-center justify-center flex-col mt-4 mb-4">
            <h1>Flavor Profile</h1>
            {/* About me/What do you like to eat? */}




            <div className="flex h-screen w-full justify-center ">
            <div>
                <h1>About Me</h1>
            </div>
            <div>
                <h1>About My Pallet</h1>
            </div>
            </div>
            </div>
            
        </div>
    </div>
  );
}
