"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Adjust the path as needed
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider is rendering"); // Debug log

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed in provider:", user); // Debug log
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
