// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfSjDOgQ5ZPvObHeaekWcija2xWO9WdNU",
  authDomain: "chatapp-823ce.firebaseapp.com",
  projectId: "chatapp-823ce",
  storageBucket: "chatapp-823ce.appspot.com",
  messagingSenderId: "187185555995",
  appId: "1:187185555995:web:98f9166dce64c44487a6be",
  measurementId: "G-KJCFR69L7E",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
