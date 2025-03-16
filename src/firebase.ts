// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPhb9u3oI1VSAjwWlI5VaQi3E-D1dljwk",
  authDomain: "mindpad-b578e.firebaseapp.com",
  projectId: "mindpad-b578e",
  storageBucket: "mindpad-b578e.firebasestorage.app",
  messagingSenderId: "174760161960",
  appId: "1:174760161960:web:26f7472d2ec2dd2d47089d",
  measurementId: "G-WH8LV8K14L",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
