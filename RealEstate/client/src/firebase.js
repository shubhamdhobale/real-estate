// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fe409.firebaseapp.com",
  projectId: "mern-estate-fe409",
  storageBucket: "mern-estate-fe409.appspot.com",
  messagingSenderId: "182762879656",
  appId: "1:182762879656:web:8972ce9179efea23b9209d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);