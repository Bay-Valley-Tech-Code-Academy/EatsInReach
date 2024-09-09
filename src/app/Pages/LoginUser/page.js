"use client";

import Link from "next/link";

export default function LoginUser() {

  const handleUserLogin = async (email, password, verifyPassword, signUp) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          verifyPassword,
          signUp,
          role: "user", // Specify user role
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User login/signup successful:", data.message);
        // redirect to user home page
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <div>User Login</div>
      <Link href="/">Back</Link>
    </div>
  );
}
