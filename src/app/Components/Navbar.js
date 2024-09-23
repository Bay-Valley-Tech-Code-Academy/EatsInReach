"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/authContext";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";

export default function Navbar() {
  const { currentUser, userName, setUserName } = useAuth();
  const [role, setRole] = useState(null);

  const [isOpen, setIsOpen] = useState(false); // State to toggle the hamburger menu

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const collections = ["users", "vendors", "admins"];
        let found = false;

        for (const collection of collections) {
          if (found) break;

          try {
            const userDoc = await getDoc(
              doc(firestore, collection, currentUser.uid)
            );

            if (userDoc.exists()) {
              const userData = userDoc.data();
              setRole(userData.role); // This will now be "users", "vendors", or "admins"
              setUserName(userData.userName);
              found = true; // Stop checking further collections once the user is found
            }
          } catch (error) {
            console.error(
              `Error fetching user data from ${collection} collection:`,
              error
            );
          }
        }

        if (!found) {
          console.log(
            "User document does not exist in any of the collections."
          );
          setRole(null);
          setUserName(null);
        }
      };

      fetchUserData();
    } else {
      setRole(null);
      setUserName(null);
    }
  }, [currentUser]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("User signed out"))
      .catch((error) => console.error("Sign out error: ", error));
  };

  return (
    <header className="bg-Buff flex w-full items-center h-screen max-h-14 justify-between ">
      <div className="flex mx-4 justify-between items-center">
        <Link href="/">
          <img
            src="/images/actual_logo.png"
            height="30"
            width="40"
            alt="Yum Yummers"
            className="hover:cursor-pointer "
          />
        </Link>

        {currentUser && role === "vendor" && (
          <h2 className="sm:block pl-2">Vendor: </h2>
        )}
        {currentUser && role === "admin" && (
          <h2 className="sm:block pl-2">Admin: </h2>
        )}
        {userName && <h2 className="sm:block pl-2">{userName}</h2>}
      </div>

      {/* Hamburger icon */}
      <div className="sm:hidden mr-4  ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden sm:flex"> 

        <Link href="/Pages/Restaurants">
          <div className="hover:bg-[#bb9277] p-2 sm:p-4">
            <h2>Restaurants</h2>
          </div>
        </Link>

        {currentUser && role === "user" && (
          <Link href="/Pages/Favorites">
            <div className="hover:bg-[#bb9277] p-2 sm:p-4">
              <h2>Favorites</h2>
            </div>
          </Link>
        )}
        {currentUser && role === "vendor" && (
          <>
            <Link href="/Pages/VendorSubmission">
              <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                <h2>Submit Restaurant</h2>
              </div>
            </Link>
            <Link href="/Pages/VendorPage">
              <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                <h2>Vendor Page</h2>
              </div>
            </Link>
          </>
        )}
        {currentUser && role === "admin" && (
          <>
            <Link href="/Pages/Admin">
              <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                <h2>Admin Page</h2>
              </div>
            </Link>

            <Link href="/Pages/ReviewSubmissions">
              <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                <h2>Review Submissions</h2>
              </div>
            </Link>
          </>
        )}
        {currentUser && (role === "user" || role === "vendor") && (
          <Link href="/Pages/AccountSettings">
            <div className="hover:bg-[#bb9277] p-2 sm:p-4">
              <h2>Account Settings</h2>
            </div>
          </Link>
        )}
        {currentUser ? (
          <div
            className="hover:bg-[#bb9277] p-2 sm:p-4 cursor-pointer"
            onClick={handleSignOut}
          >
            <h2>Sign Out</h2>
          </div>
        ) : (
          <Link href="/Pages/Login">
            <div className="hover:bg-[#bb9277] p-2 sm:p-4">
              <h2>Login</h2>
            </div>
          </Link>
        )}
      </div>

      {/* Mobile menu (hamburger)  This is where you change color of hamburger menu */}
      {isOpen && (
        <div className="sm:hidden absolute  top-14 -right-2 bg-[#dfaf90] flex flex-col items-center z-10">
          <Link href="/Pages/Cart" className="w-full">
            <div className="hover:bg-[#bb9277] w-full flex justify-center p-2">
              <img
                src="/images/shoppingcart.png"
                height="15"
                width="25"
                alt="Your Shopping Cart"
              />
            </div>
          </Link>

          <Link href="/Pages/Restaurants" className="w-full">
            <div className="hover:bg-[#bb9277] w-full text-center p-2">
              <h2>Restaurants</h2>
            </div>
          </Link>

          {currentUser && role === "user" && (
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
            </>
          )}
          {currentUser && role === "vendor" && (
            <>
              <Link href="/Pages/VendorSubmission">
                <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                  <h2>Submit Restaurant</h2>
                </div>
              </Link>

              <Link href="/Pages/VendorPage">
                <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                  <h2>Vendor Page</h2>
                </div>
              </Link>
            </>
          )}
          {currentUser && role === "admin" && (
            <>
              <Link href="/Pages/Admin">
                <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                  <h2>Admin Page</h2>
                </div>
              </Link>

              <Link href="/Pages/ReviewSubmissions">
                <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                  <h2>Review Submissions</h2>
                </div>
              </Link>
            </>
          )}
          {currentUser ? (
            <div
              className="hover:bg-[#bb9277] p-2 sm:p-4 cursor-pointer"
              onClick={handleSignOut}
            >
              <h2>Sign Out</h2>
            </div>
          ) : (
            <Link href="/Pages/Login">
              <div className="hover:bg-[#bb9277] p-2 sm:p-4">
                <h2>Login</h2>
              </div>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
