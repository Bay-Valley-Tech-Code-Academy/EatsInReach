"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "../../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../../context/authContext";

export default function Login() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    verifyPassword: "",
    role: "",
  });

  useEffect(() => {
    const checkUserRoleAndRedirect = async () => {
      if (!loading && currentUser) {
        try {
          // Retrieve role from Firestore
          const userRole = await getUserRole(currentUser.uid);

          // Redirect based on role
          if (userRole === "vendor") {
            router.push("/Pages/VendorSubmission");
          } else if (userRole === "user") {
            router.push("/Pages/Restaurants");
          } else {
            console.error("Unable to determine user role.");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    if (!loading && redirecting) {
      checkUserRoleAndRedirect();
    }
  }, [currentUser, loading, redirecting, router]);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (signUp) {
        // Sign Up logic
        if (formData.password !== formData.verifyPassword) {
          setError("Passwords do not match");
          return;
        } else if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          return;
        }

        // Create new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);

        // Determine the collection name based on the role
        const collectionName = formData.role === "vendor" ? "vendors" : "users";

        // Add user/vendor to Firestore
        await setDoc(doc(firestore, collectionName, user.uid), {
          email: formData.email,
          userName: formData.userName,
          role: formData.role,
        });

        // Set redirecting to true to avoid race conditions
        setRedirecting(true);
      } else {
        // Sign In logic
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        // Set redirecting to true to avoid race conditions
        setRedirecting(true);
      }
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
  if (loading || redirecting) {
    return <div>{redirecting ? "Redirecting..." : "Loading..."}</div>; // Replace with a loading spinner if needed
  }

  return (
    <div className="w-full flex flex-col items-center place-content-center h-screen login-page">
      <Link href="/">
        <img
          src="/images/logo-placeholder.jpg"
          alt="logo"
          className=" absolute top-0 left-0  " height="30" width="40"
        />
      </Link>
      <div className="w-3/4 sm:w-1/2 lg:w-1/4 bg-[#AAD15F] rounded-xl flex flex-col items-center">
        <h1 className="text-6xl p-3 text-center">Let's Eat!</h1>
        <form onSubmit={handleAuth} className="flex flex-col w-3/4 pt-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={updateForm}
            placeholder="Email"
            required
            className="mb-4 p-1"
          />
          {signUp && (
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={updateForm}
              placeholder="User Name"
              required
              className="mb-4 p-1"
            />
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={updateForm}
            placeholder="Password"
            required
            className="mb-4 p-1"
          />
          {signUp && (
            <input
              type="password"
              name="verifyPassword"
              value={formData.verifyPassword}
              onChange={updateForm}
              placeholder="Verify Password"
              required
              className="mb-4 p-1"
            />
          )}
          {signUp && (
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={updateForm}
                  className="mb-4 mr-1"
                  required
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={formData.role === "vendor"}
                  onChange={updateForm}
                  className="mb-4 mr-1"
                />
                Vendor
              </label>
            </div>
          )}
          <div className="text-center p-2">
            <button
              type="submit"
              className="bg-[#FDE4CE] hover:bg-[#FBCDAC] p-2 rounded-xl"
            >
              {signUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}!</p>}
          <div className="text-center p-2">
            {signUp ? (
              <p>
                Have an account:
                <span
                  className="text-[#D22701] hover:cursor-pointer hover:text-[#4E070C] pl-1"
                  onClick={() => {
                    setSignUp(!signUp);
                    setError("");
                  }}
                >
                  Sign In
                </span>
              </p>
            ) : (
              <p>
                Don't have an account:
                <span
                  className="text-[#D22701] hover:cursor-pointer hover:text-[#4E070C] pl-1"
                  onClick={() => setSignUp(!signUp)}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
