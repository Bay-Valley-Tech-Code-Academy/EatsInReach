"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdmin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setError("");
        // Redirect based on role
        if (data.role === "admin") {
          router.push("/Admin"); 
        } else {
          console.error("Role:", data.role);
          setError("Your role is not set to admin");
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
