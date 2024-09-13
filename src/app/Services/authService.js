import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export const signUp = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Send verification email
    await sendEmailVerification(user);
    console.log("Verification email sent.");
    return user;
  } catch (error) {
    throw error;
  }
};
