import { auth, firestore } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const { email, password, verifyPassword, signUp, role } = await request.json();

    // Handle role (user or vendor)
    const userType = role === "vendor" ? "vendors" : "users";

    // Sign Up logic
    if (signUp) {
      if (password !== verifyPassword) {
        return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
      } else if (password.length < 6) {
        return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), { status: 400 });
      }

      // Create new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user/vendor to Firestore
      await setDoc(doc(firestore, userType, user.uid), { email });

      return new Response(JSON.stringify({ message: `New ${role} signed up successfully` }), { status: 200 });
    }

    // Sign In logic
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return new Response(JSON.stringify({ message: `${role} signed in successfully` }), { status: 200 });
  } catch (error) {
    console.error("Error in API:", error.code, error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
