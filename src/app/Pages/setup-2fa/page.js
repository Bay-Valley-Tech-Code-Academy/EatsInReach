"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Setup2FA() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/setup-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, email }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/"); // Redirect to the home page or wherever necessary
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred while setting up 2FA.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center place-content-center h-screen">
      <h1 className="text-4xl mb-4">Set Up 2FA</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 sm:w-1/2 lg:w-1/4">
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number (optional)"
          className="mb-4 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          className="mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isSubmitting ? "Submitting..." : "Set Up 2FA"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
