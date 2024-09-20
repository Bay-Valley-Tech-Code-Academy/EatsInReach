"use client";
import Navbar from "@/Components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { updateEmail, updatePassword } from "firebase/auth";

export default function UserProfile() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Redirect to the landing page if the user is not logged in
    if (!loading && !currentUser) {
      router.push("/");
    }
    if (currentUser) {
      const fetchUserData = async () => {
        const collections = ["users", "vendors", "admins"];
        let found = false;

        for (const collection of collections) {
          if (found) break;

          try {
            const userDoc = await getDoc(
              doc(firestore, collection, currentUser.uid)
            );

            if (userDoc.exists()) {
              const userData = userDoc.data();
              if (userData.role !== "user") {
                router.push("/");
              }
              found = true;
              setRole(userData.role);
            }
          } catch (error) {
            console.error(
              `Error fetching user data from ${collection} collection:`,
              error
            );
          }
        }

        if (!found) {
          console.log(
            "User document does not exist in any of the collections."
          );
          setRole(null);
        }
        setIsRoleLoading(false);
      };

      fetchUserData();
    }
  }, [currentUser, loading, router]);

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
      throw new Error("Reauthentication failed: " + error.message);
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        userName: newUsername,
      });
      setSuccessMessage("Username updated successfully!");
    } catch (error) {
      setError("Failed to update username: " + error.message);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      await reauthenticate(currentPassword);
      await updateEmail(currentUser, newEmail);
      setSuccessMessage("Email updated successfully!");
    } catch (error) {
      setError("Failed to update email: " + error.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await reauthenticate(currentPassword);
      await updatePassword(currentUser, newPassword);
      setSuccessMessage("Password updated successfully!");
    } catch (error) {
      setError("Failed to update password: " + error.message);
    }
  };

  // Show a loading indicator or null while checking auth state
  if (loading || isRoleLoading) {
    return <div>Loading...</div>; // Replace with a loading spinner if needed
  }

  if (!currentUser || role !== "user") {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex bg-Yellow-Green justify-center items-center h-11 ">
        <h1>Account Settings</h1>
      </div>

      <div className="flex max-md:flex-col max-md:items-center md:h-[calc(100vh-100px)] bg-Almond justify-between overflow-hidden">
        {/* sidebar */}
        <div className="bg-[#FDE4CE] drop-shadow-xl md:h-[calc(100vh-120px)] w-2/6 max-md:w-3/4 max-md:ml-1 md:ml-10 mt-3 rounded-lg m-2">
          <ul>
            <li className="hover:bg-Yellow-Green active:bg-green-700">
              <div className="flex ml-3 p-2">
                <img
                  src="/images/profile-icon.png"
                  height="15"
                  width="25"
                  alt="Profile"
                />
                <h1 className="ml-5">Profile</h1>
              </div>
            </li>
          </ul>
        </div>
        <div className=" bg-[#b5d773] flex flex-col h-[calc(100vh-130px)] w-full justify-between items-center md:p-1 md:m-5 md:ml-14 rounded-lg">
          <div className="flex justify-self-start mt-5 underline">
            <h1>Profile Settings</h1>
          </div>

          <div className=" bg-Dartmouth-green flex flex-col justify-center items-center space-y-10 h-full px-10 my-16 rounded-3xl">
            <form
              className="flex max-sm:flex-col max-sm:items-center"
              onSubmit={handleUsernameChange}
            >
              <h1 className="text-white">Change Username</h1>
              <input
                type="text"
                placeholder="Enter new username..."
                className="outline-none pl-2 m-1 rounded-md"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button className="bg-[#FDE4CE] outline-2 px-2 rounded-md">
                Change
              </button>
            </form>
            <form className="flex max-sm:flex-col max-sm:items-center" onSubmit={handleEmailChange}>
              <h1 className="mr-2 text-white">Change Email</h1>
              <input
                type="email"
                placeholder="Enter new email..."
                className="outline-none mr-2 pl-2 m-1 rounded-md"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter current password..."
                className="outline-none mr-2 pl-2 m-1 rounded-md"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button className="bg-Almond outline-2 px-2 rounded-md">
                Change
              </button>
            </form>
            <form
              className="flex max-sm:flex-col max-sm:items-center"
              onSubmit={handlePasswordChange}
            >
              <h1 className="text-white mr-2">Change Password</h1>
              <input
                type="password"
                placeholder="Enter new password..."
                className="outline-none mr-2 pl-2 m-1 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter current password..."
                className="outline-none mr-2 pl-2 m-1 rounded-md"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button className="bg-Almond outline-2 px-2 mb-1 rounded-md">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
