"use client";
import Link from "next/link";
import Navbar from "@/Components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase";

export default function UserProfile() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  

  useEffect(() => {
    // Redirect to the landing page if the user is not logged in
    if (!loading && !currentUser) {
      router.push("/");
    }
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
              if (userData.role !== "user") {
                router.push("/");
              }
              found = true;
              setRole(userData.role);
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
        }
        setIsRoleLoading(false);
      };

      fetchUserData();
    }
  }, [currentUser, loading, router]);

  // Show a loading indicator or null while checking auth state
  if (loading || isRoleLoading) {
    return <div>Loading...</div>; // Replace with a loading spinner if needed
  }

  if (!currentUser || role !== "user") {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex bg-Yellow-Green justify-center items-center h-11 ">
        <h1>Account Settings</h1>
      </div>

      <div className="flex h-[calc(100vh-100px)] bg-Almond justify-between overflow-hidden">
        {/* sidebar */}
        <div className="bg-[#FDE4CE] drop-shadow-xl h-[calc(100vh-120px)] w-2/6 ml-10 mt-3 rounded-lg">
          <ul>
            <li className="hover:bg-Yellow-Green">
              <div className="flex ml-3 mt-5">
                <img
                  src="/images/profile-icon.png"
                  height="15"
                  width="25"
                  alt="Profile"
                />
                <h1 className="ml-5">Profile</h1>
              </div>
            </li>
          </ul>
        </div>

        <div className=" bg-[#b5d773] flex flex-col h-[calc(100vh-130px)] w-full justify-between items-center m-5 ml-14 rounded-lg">
          <div className="flex justify-self-start mt-5 underline">
            <h1>Profile Settings</h1>
          </div>

          <div className=" bg-Dartmouth-green flex flex-col justify-center items-center space-y-10 h-full px-10 my-16 rounded-3xl  ">
            <form className="flex">
              <h1 className="text-white mr-2">Change Username</h1>
              <input
                type="text"
                placeholder="Enter new username... "
                className="outline-none mr-2 pl-2 rounded-md"
              />
              <button className="bg-[#FDE4CE] outline-2 px-2 rounded-md">Change</button>
            </form>

            <form className="flex justify-center">
              <h1 className="mr-2 text-white">Change Password</h1>
              <input
                type="text"
                placeholder="Enter new password... "
                className=" outline-none mr-2 pl-2  rounded-md"
              />
              <button className="bg-Almond outline-2 px-2 rounded-md"> Sign In </button>
            </form>
            <form className="flex justify-center">
              <h1 className="text-white mr-2">Change Email</h1>
              <input
                type="text"
                placeholder="Enter new email... "
                className=" outline-none mr-2 pl-2 rounded-md"
              />
              <button className="bg-Almond outline-2 px-2 rounded-md"> Sign In </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}