import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmQSB7OqJiQVUdfeZw7MRLUM7s6V2SqPU",
  authDomain: "react-links-26c76.firebaseapp.com",
  projectId: "react-links-26c76",
  storageBucket: "react-links-26c76.firebasestorage.app",
  messagingSenderId: "943402773870",
  appId: "1:943402773870:web:66bdb7f0b65359aa1c257f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
