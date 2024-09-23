"use client";
import Navbar from "@/Components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import {
  verifyBeforeUpdateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

export default function UserProfile() {
  const router = useRouter();
  const { currentUser, loading, setUserName } = useAuth();
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordEmail, setCurrentPasswordEmail] = useState("");
  const [error, setError] = useState(null);
  const [successful, setSuccessful] = useState(null);

  useEffect(() => {
    // Redirect to the landing page if the user is not logged in
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    if (successful) {
      const timer = setTimeout(() => {
        setSuccessful(null);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Clean up the timer when component unmounts or successful changes
    }
  }, [successful]);

  // Reauthenticate user with current password
  const reauthenticate = async (password) => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    try {
      await reauthenticateWithCredential(currentUser, credential);
      console.log("Reauthentication successful");
    } catch (error) {
      setError("Failed to update email: " + error.message);
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        userName: newUsername,
      });
      setSuccessful("Username updated successfully!");
      setError(null);

      // Trigger a re-fetch of user data in the Navbar
      const userData = await getDoc(userDocRef);
      if (userData.exists()) {
        setUserName(userData.data().userName); // Set the new username in the state
      }
    } catch (error) {
      setError("Failed to update username: " + error.message);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();

    try {
      // Ensure reauthentication
      await reauthenticate(currentPasswordEmail);
      await verifyBeforeUpdateEmail(currentUser, newEmail);
      setSuccessful(
        "Email updated successfully! Please check inbox to validate email before using!"
      );
      setError(null);
    } catch (error) {
      // Handle specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please try a different one.");
      } else if (error.code === "auth/operation-not-allowed") {
        setError("This operation is not allowed.");
      } else {
        setError("Failed to update email: " + error.message);
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await reauthenticate(currentPassword);
      await updatePassword(currentUser, newPassword);
      setSuccessful("Password updated successfully!");
      setError(null);
    } catch (error) {
      setError("Failed to update password: " + error.message);
    }
  };

  // Show a loading indicator or null while checking auth state
  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner if needed
  }

  if (!currentUser) {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex bg-Yellow-Green justify-center items-center h-11 ">
        <h1>Account Settings</h1>
      </div>
      {error && (
        <div className="flex bg-red-500 justify-center items-center h-11 ">
          <p className="text-black">{error}</p>
        </div>
      )}
      {successful && (
        <div className="flex bg-Yellow-Green justify-center items-center h-11 ">
          <p className="text-black">{successful}</p>
        </div>
      )}
      <div className="flex max-md:flex-col max-md:items-center md:h-[calc(100vh-100px)] bg-Almond overflow-hidden">
        {/* sidebar */}
        <div className="bg-[#FDE4CE] drop-shadow-xl md:h-[calc(100vh-120px)] w-2/6 md:w-1/12 max-md:w-3/4 max-md:ml-1 md:ml-10 mt-3 rounded-lg m-2">
          <ul>
            <li className="hover:bg-Yellow-Green active:bg-green-700">
              <div className="flex flex-wrap justify-center p-2">
                <img
                  src="/images/profile-icon.png"
                  height="15"
                  width="25"
                  alt="Profile"
                />
                <h1 className=" text-center">Profile</h1>
              </div>
            </li>
          </ul>
        </div>
        <div className=" bg-[#b5d773] flex flex-col h-[calc(100vh-130px)] w-4/6 max-md:w-3/4 justify-between items-center md:p-1 md:m-5 md:ml-28 rounded-lg">
          <div className="flex justify-self-start mt-5 underline">
            <h1>Profile Settings</h1>
          </div>

          <div className=" bg-Dartmouth-green flex flex-col justify-center items-center w-5/6 max-md:w-3/4 space-y-8 h-full my-16 rounded-3xl">
            <form
              className="flex max-lg:flex-col max-lg:items-center m-2"
              onSubmit={handleUsernameChange}
            >
              <h1 className="text-white">Change Username</h1>
              <input
                type="text"
                placeholder="Enter new username..."
                className="outline-none pl-2 m-1 rounded-md"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
              <button className="bg-[#FDE4CE] outline-2 px-2 rounded-md">
                Change
              </button>
            </form>
            <form
              className="flex max-lg:flex-col max-lg:items-center m-2"
              onSubmit={handleEmailChange}
            >
              <h1 className="mr-2 text-white">Change Email</h1>
              <div className="flex max-lg:flex-col">
                <input
                  type="email"
                  placeholder="Enter new email..."
                  className="outline-none mr-2 pl-2 m-1 rounded-md"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter current password..."
                  className="outline-none mr-2 pl-2 m-1 rounded-md"
                  value={currentPasswordEmail}
                  onChange={(e) => setCurrentPasswordEmail(e.target.value)}
                  required
                />
                <button className="bg-Almond outline-2 px-2 rounded-md">
                  Change
                </button>
              </div>
            </form>
            <form
              className="flex max-lg:flex-col max-lg:items-center m-2"
              onSubmit={handlePasswordChange}
            >
              <h1 className="text-white mr-2">Change Password</h1>
              <div className="flex max-lg:flex-col">
                <input
                  type="password"
                  placeholder="Enter new password..."
                  className="outline-none mr-2 pl-2 m-1 rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter current password..."
                  className="outline-none mr-2 pl-2 m-1 rounded-md"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <button className="bg-Almond outline-2 px-2 mb-1 rounded-md">
                  Change
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
