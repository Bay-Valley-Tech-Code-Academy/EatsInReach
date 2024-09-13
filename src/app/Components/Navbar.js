"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../../context/authContext";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../../../firebase";

export default function Navbar() {
  const { currentUser } = useAuth();
  const [role, setRole] = useState(null);
  useEffect(() => {
    console.log('Current user in Navbar:', currentUser);
    if (currentUser) {
      const fetchUserRole = async () => {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRole(userData.role);
        } else {
          console.log("User document does not exist in Firestore.");
        }
      };

      fetchUserRole();
    } else {
      setRole(null);
    }
  }, [currentUser]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("User signed out"))
      .catch((error) => console.error("Sign out error: ", error));
  };

  return (
    <header className="bg-[#dfaf90] flex w-full items-center h-screen max-h-14 justify-between">
      <div className="flex mx-4 justify-between items-center ">
        <Link href="/">
          <Image src="/phLogo.png" height="30" width="40" alt="Yum Yummers" />
        </Link>
        <h2 className="hidden sm:block pl-2">Yum Yummers</h2>
      </div>

      <div className="flex">
        <Link href="/Pages/Cart">
          <div className="hover:bg-[#bb9277] p-2 sm:p-4">
            <Image
              src="/shoppingcart.png"
              height="15"
              width="25"
              alt="Your Shopping Cart"
            />
          </div>
        </Link>

        <Link href="/Pages/Restaurants">
          <div className="hover:bg-[#bb9277] p-2 sm:p-4">
            <h2>Restaurants</h2>
          </div>
        </Link>

        {currentUser && role === "user" ? (
          <>
            <Link href="/Pages/Favorites">
              <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                <h2>Favorites</h2>
              </div>
            </Link>

            <Link href="/Pages/UserProfile">
              <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                <h2>User Profile</h2>
              </div>
            </Link>

            <div
              className="hover:bg-[#bb9277] p-2 sm:p-4 cursor-pointer"
              onClick={handleSignOut}
            >
              <h2>Sign Out</h2>
            </div>
          </>
        ) : (
          <Link href="/Pages/Login">
            <div className="hover:bg-[#bb9277] p-2 sm:p-4">
              <h2>Login</h2>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}