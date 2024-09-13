import { auth, firestore } from "../../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const { email, password, verifyPassword, signUp, role } =
      await request.json();
    // Handle role (user or vendor)
    const userType = role === "vendor" ? "vendors" : "users";
    
    // Sign Up logic
    if (signUp) {
      if (password !== verifyPassword) {
        return new Response(
          JSON.stringify({ error: "Passwords do not match" }),
          { status: 400 }
        );
      } else if (password.length < 6) {
        return new Response(
          JSON.stringify({ error: "Password must be at least 6 characters" }),
          { status: 400 }
        );
      }

      // Create new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user/vendor to Firestore
      await setDoc(doc(firestore, userType, user.uid), { email, role });

      return new Response(
        JSON.stringify({ message: `New ${role} signed up successfully`, role }),
        { status: 200 }
      );
    }

    // Sign In logic
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Retrieve role and 2FA status from Firestore
    let userRole = "unknown";
    let requires2FA = false;
    const userDoc = await getDoc(doc(firestore, "users", user.uid));

    if (userDoc.exists()) {
      userRole = userDoc.data().role;
      requires2FA = userDoc.data().requires2FA || false;
    } else {
      const vendorDoc = await getDoc(doc(firestore, "vendors", user.uid));
      if (vendorDoc.exists()) {
        userRole = vendorDoc.data().role;
        requires2FA = vendorDoc.data().requires2FA || false;
      }
    }

    // Check if the user is an admin (You can have a flag like `isAdmin`)
    const adminDoc = await getDoc(doc(firestore, "admins", user.uid));
    if (adminDoc.exists()) {
      userRole = "admin"; // If user is admin, override role
    }

    console.log("User Role:", userRole);

    return new Response(
      JSON.stringify({
        message: `${role} signed in successfully`,
        role: userRole,
        requires2FA: requires2FA, // Add this field to indicate 2FA requirement
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API:", error.code, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
