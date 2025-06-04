// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3xyuzg0NcwEmooz1OkWKWWNH6f95crPg",
  authDomain: "supermarket-study.firebaseapp.com",
  projectId: "supermarket-study",
  storageBucket: "supermarket-study.firebasestorage.app",
  messagingSenderId: "133385886377",
  appId: "1:133385886377:web:96657377ede95ecd0f67b8",
  measurementId: "G-TJ78CVRRDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
