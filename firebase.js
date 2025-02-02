// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBCyVCUbsX9zBxKJW6qoz3p9qE5O8Ejig",
  authDomain: "amzn-2024.firebaseapp.com",
  projectId: "amzn-2024",
  storageBucket: "amzn-2024.appspot.com",
  messagingSenderId: "229172541222",
  appId: "1:229172541222:web:d2815ebf1886f540b6b3e7",
  measurementId: "G-3NESN9NGPL",
};

// Initialize Firebase conditionally
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
