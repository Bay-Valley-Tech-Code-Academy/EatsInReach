"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../../../firebase";
import { useAuth } from "../../../../context/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginAdmin() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      if (!loading && currentUser) {
        try {
          // User is already logged in, redirect them based on their role
          const userRole = await getUserRole(currentUser.uid);
          if (userRole === "vendor") {
            router.push("/Pages/VendorSubmission");
          } else if (userRole === "user") {
            router.push("/Pages/Restaurants");
          } else if (userRole === "admin") {
            router.push("/Pages/Admin");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    redirectIfLoggedIn();
  }, [currentUser, loading, router]);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Set redirecting to true to avoid race conditions
      setRedirecting(true);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

  const getUserRole = async (uid) => {
    const userDoc = await getDoc(doc(firestore, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }

    const vendorDoc = await getDoc(doc(firestore, "vendors", uid));
    if (vendorDoc.exists()) {
      return vendorDoc.data().role;
    }

    // Check for admin role if needed
    const adminDoc = await getDoc(doc(firestore, "admins", uid));
    if (adminDoc.exists()) {
      return "admin";
    }

    return "unknown";
  };

  // Show a loading indicator or null while checking auth state
  if (loading || redirecting || currentUser) {
    return <div>{redirecting ? "Redirecting..." : "Loading..."}</div>; // Replace with a loading spinner if needed
  }

  return (
    <div className="w-full flex flex-col items-center place-content-center h-screen login-page">
      <div className="w-3/4 sm:w-1/2 lg:w-1/4 bg-[#AAD15F] rounded-xl flex flex-col items-center">
        <h1 className="text-6xl p-3 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col w-3/4 pt-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={updateForm}
            placeholder="Email"
            required
            className="mb-4 p-1"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={updateForm}
            placeholder="Password"
            required
            className="mb-4 p-1"
          />
          <div className="text-center p-2">
            <button
              type="submit"
              className="bg-[#FDE4CE] hover:bg-[#4E070C] hover:text-white p-2 rounded-xl"
            >
              Sign In
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}!</p>}
        </form>
      </div>
    </div>
  );
}
