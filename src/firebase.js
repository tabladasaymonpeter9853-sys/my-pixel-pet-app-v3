import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in your Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyCUTXkEEs_iqcr7PBB-WrTU2yjFpXMOGe4",
  authDomain: "my-pixel-pet-app-v3.firebaseapp.com",
  projectId: "my-pixel-pet-app-v3",
  storageBucket: "my-pixel-pet-app-v3.firebasestorage.app",
  messagingSenderId: "1018976089490",
  appId: "1:1018976089490:web:66b50e3d27972b17aa3d4b",
  measurementId: "G-PPC28Y19V1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export it
export const db = getFirestore(app);
