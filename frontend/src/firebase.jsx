// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-99a4f.firebaseapp.com",
  projectId: "mern-blog-99a4f",
  storageBucket: "mern-blog-99a4f.appspot.com",
  messagingSenderId: "222792423259",
  appId: "1:222792423259:web:a49debf6e653acce95ac7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);