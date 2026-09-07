import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vertexai-c14f1.firebaseapp.com",
  projectId: "vertexai-c14f1",
  storageBucket: "vertexai-c14f1.firebasestorage.app",
  messagingSenderId: "574040953515",
  appId: "1:574040953515:web:aef6d4e192c4c29cb61dee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
