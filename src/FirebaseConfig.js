// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIjn1gm6vuTzBsmB4WNV_c6oqaTFSb5dY",
  authDomain: "location-db-41d66.firebaseapp.com",
  projectId: "location-db-41d66",
  storageBucket: "location-db-41d66.appspot.com",
  messagingSenderId: "774440850651",
  appId: "1:774440850651:web:8f0a36055996d527c8e8fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);