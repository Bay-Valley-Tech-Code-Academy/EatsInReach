"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../context/authContext";
import Navbar from "@/Components/Navbar";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../../firebase";

export default function MenuItemPage() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    menuName: "",
    description: "",
  });

  useEffect(() => {
    if (!loading && !currentUser) {
      console.log("No current user, redirecting...");
      router.push("/");
    } else if (currentUser) {
      const fetchUserData = async () => {
        const collections = ["users", "vendors", "admins"];
        let found = false;

        for (const collection of collections) {
          if (found) break;

          try {
            const userDoc = await getDoc(doc(firestore, collection, currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log("User data found:", userData);
              if (userData.role !== "vendor") {
                console.log("User is not a vendor, redirecting...");
                router.push("/");
              } else {
                found = true;
                setRole(userData.role);
              }
            }
          } catch (error) {
            console.error(`Error fetching user data from ${collection}:`, error);
          }
        }

        if (!found) {
          console.log("User document does not exist in any collection.");
          setRole(null);
        }
        setIsRoleLoading(false);
      };

      fetchUserData();
    }
  }, [currentUser, loading, router]);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  // Show a loading indicator while checking auth state or role
  if (loading || isRoleLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || role !== "vendor") {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-4 bg-[#FDFBCE] min-h-[100vh] p-6 overflow-x-hidden">
        <h1 className="text-2xl font-bold">Create Menu</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col items-center justify-center gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col w-3/4 pt-6">
          <input
            type="text"
            placeholder="Menu Name"
            name="menuName"
            value={formData.menuName}
            onChange={updateForm}
            className="border p-2 rounded"
          />
          <textarea
            type="text"
            placeholder="Menu Description"
            name="description"
            value={formData.description}
            onChange={updateForm}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded drop-shadow-md"
          >
            Submit Menu
          </button>
          </form>
        </div>
        <div>
            {/* render menus here */}
        </div>
      </div>
    </>
  );
}