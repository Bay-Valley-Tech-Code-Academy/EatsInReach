import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from './firebase'; // Ensure this path is correct

export const signUpWithEmail = async (email, password) => {
  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification to the newly created user
    await sendEmailVerification(user);

    return { success: true, message: "Verification email sent. Please check your inbox." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
