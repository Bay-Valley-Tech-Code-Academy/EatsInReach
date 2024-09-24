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

// Constants
const SecurityIcon = "/images/security.png"; // Update the path to the security icon
const SUCCESS_TIMEOUT = 3000;

const InputField = ({ type, placeholder, value, onChange, required }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="outline-none pl-2 m-1 rounded-md"
    value={value}
    onChange={onChange}
    required={required}
  />
);

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
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    if (successful) {
      const timer = setTimeout(() => {
        setSuccessful(null);
      }, SUCCESS_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [successful]);

  const reauthenticate = async (password) => {
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    try {
      await reauthenticateWithCredential(currentUser, credential);
      console.log("Reauthentication successful");
    } catch (error) {
      setError("Failed to reauthenticate: " + error.message);
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userDocRef, { userName: newUsername });
      setSuccessful("Username updated successfully!");
      setError(null);

      const userData = await getDoc(userDocRef);
      if (userData.exists()) {
        setUserName(userData.data().userName);
      }
    } catch (error) {
      setError("Failed to update username: " + error.message);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      await reauthenticate(currentPasswordEmail);
      await verifyBeforeUpdateEmail(currentUser, newEmail);
      setSuccessful("Email updated successfully! Please check your inbox to validate.");
      setError(null);
    } catch (error) {
      handleError(error);
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

  const handleError = (error) => {
    const errorMessages = {
      "auth/email-already-in-use": "This email is already in use. Please try a different one.",
      "auth/operation-not-allowed": "This operation is not allowed.",
    };
    setError(errorMessages[error.code] || "Failed to update email: " + error.message);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex bg-Yellow-Green justify-center items-center h-11">
        <h1 className="text-lg font-semibold">Account Settings</h1>
      </div>
      {error && (
        <div className="flex bg-red-500 justify-center items-center h-11">
          <p className="text-black">{error}</p>
        </div>
      )}
      {successful && (
        <div className="flex bg-Yellow-Green justify-center items-center h-11">
          <p className="text-black">{successful}</p>
        </div>
      )}
      <div className="flex max-md:flex-col max-md:items-center md:h-[calc(100vh-100px)] bg-Almond overflow-hidden">
        <div className="bg-[#FDE4CE] drop-shadow-xl md:h-[calc(100vh-120px)] w-2/6 md:w-1/4 max-md:w-3/4 max-md:ml-1 md:ml-10 mt-3 rounded-lg m-2">
          <ul>
            {["profile", "security"].map((section) => (
              <li
                key={section}
                className={`hover:bg-Yellow-Green active:bg-green-700 cursor-pointer transition-colors duration-200 ${activeSection === section ? "bg-Yellow-Green" : ""}`}
                onClick={() => setActiveSection(section)}
              >
                <div className="flex items-center justify-center p-2">
                  <img
                    src={section === "profile" ? "/images/profile-icon.png" : SecurityIcon}
                    height="25"
                    width="25"
                    alt={section === "profile" ? "Profile" : "Cyber security icon"}
                    className="m-1"
                  />
                  <h1 className="text-center text-md font-medium">{section.charAt(0).toUpperCase() + section.slice(1)}</h1>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#b5d773] flex flex-col h-[calc(100vh-130px)] w-4/6 max-md:w-3/4 justify-between items-center md:p-5 rounded-lg">
          <div className="flex justify-center mt-5 underline">
            <h1 className="text-lg font-semibold">{activeSection === "profile" ? "Profile Settings" : "Security Settings"}</h1>
          </div>
          <div className="bg-Dartmouth-green flex flex-col justify-center items-center w-5/6 max-md:w-3/4 space-y-8 h-full my-16 rounded-3xl">
            {activeSection === "profile" ? (
              <>
                <form className="flex flex-col max-lg:items-center m-2" onSubmit={handleUsernameChange}>
                  <h1 className="text-white font-semibold">Change Username</h1>
                  <InputField
                    type="text"
                    placeholder="Enter new username..."
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <button className="bg-[#FDE4CE] outline-2 px-4 py-2 rounded-md mt-2">Change</button>
                </form>
                <form className="flex flex-col max-lg:items-center m-2" onSubmit={handleEmailChange}>
                  <h1 className="mr-2 text-white font-semibold">Change Email</h1>
                  <div className="flex flex-col space-y-2">
                    <InputField
                      type="email"
                      placeholder="Enter new email..."
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <InputField
                      type="password"
                      placeholder="Enter current password..."
                      value={currentPasswordEmail}
                      onChange={(e) => setCurrentPasswordEmail(e.target.value)}
                    />
                    <button className="bg-Almond outline-2 px-4 py-2 rounded-md">Change</button>
                  </div>
                </form>
                <form className="flex flex-col max-lg:items-center m-2" onSubmit={handlePasswordChange}>
                  <h1 className="text-white font-semibold">Change Password</h1>
                  <div className="flex flex-col space-y-2">
                    <InputField
                      type="password"
                      placeholder="Enter new password..."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputField
                      type="password"
                      placeholder="Enter current password..."
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button className="bg-Almond outline-2 px-4 py-2 rounded-md">Change</button>
                  </div>
                </form>
              </>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-white">Security Settings Section</p>
                <p className="text-white">More security options coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );  
}
