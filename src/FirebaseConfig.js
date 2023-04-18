// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdT7GcIOJ8eZv9Zzwv6tiLvwCn_8nTbY8",
  authDomain: "laxmi-db.firebaseapp.com",
  projectId: "laxmi-db",
  storageBucket: "laxmi-db.appspot.com",
  messagingSenderId: "280427062748",
  appId: "1:280427062748:web:4996b4c57e77f7920b9b19",
  measurementId: "G-JD0DNS4D24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);