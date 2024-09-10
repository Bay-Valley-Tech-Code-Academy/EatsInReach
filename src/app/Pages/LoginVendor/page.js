"use client";
import Link from "next/link";

export default function LoginVendor() {
    
  const handleVendorLogin = async (email, password, verifyPassword, signUp) => {
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
          role: "vendor", // Specify vendor role
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Vendor login/signup successful:", data.message);
        // redirect to vendor home page
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <div>Vendor Login</div>
      <div>
        <Link href="/">Back</Link>
      </div>
      <div>
          <Link href="/Pages/VendorSubmission">Make a submission</Link>
      </div>
    </div>
  );
}
