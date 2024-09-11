"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginUser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    verifyPassword: "",
    role: "",
  });

  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState("");

  const updateForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          verifyPassword: formData.verifyPassword,
          signUp: signUp,
          role: formData.role,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setError("");
        // Redirect based on role
        if (data.role === "vendor") {
          router.push("/"); //change to the correct page
        } else if (data.role === "user") {
          router.push("/"); //change to the correct page
        } else {
          console.error("Unknown role:", data.role);
          setError("Unable to determine user role.");
        }
      } else {
        console.error("Error:", data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center place-content-center h-screen login-page">
      <Link href="/">
        <img
          src="/images/logo-placeholder.jpg"
          alt="logo"
          className="w-28 absolute top-0 left-0"
        />
      </Link>
      <div className="w-3/4 sm:w-1/2 lg:w-1/4 bg-gray-300 rounded-xl flex flex-col items-center">
        <h1 className="text-6xl p-3 text-center">Let's Eat!</h1>
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
              className="bg-gray-400 hover:bg-gray-500 p-2 rounded-xl"
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
                  className="text-blue-500 hover:cursor-pointer hover:text-blue-700 pl-1"
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
                  className="text-blue-500 hover:cursor-pointer hover:text-blue-700 pl-1"
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
