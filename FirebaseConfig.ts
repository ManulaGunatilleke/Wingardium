// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbtPduw6fgMWoFT8YwnklOr7aJMkNfRHg",
  authDomain: "wingardium-efda4.firebaseapp.com",
  projectId: "wingardium-efda4",
  storageBucket: "wingardium-efda4.appspot.com",
  messagingSenderId: "835335706479",
  appId: "1:835335706479:web:386e4e16d75a155d0afa9a"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);