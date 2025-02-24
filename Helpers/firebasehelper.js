// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnihFNiZchOVSGE7Mo2w3JRikbbXiSFoU",
  authDomain: "movies-54f58.firebaseapp.com",
  databaseURL: "https://movies-54f58-default-rtdb.firebaseio.com",
  projectId: "movies-54f58",
  storageBucket: "movies-54f58.appspot.com",
  messagingSenderId: "47050347887",
  appId: "1:47050347887:web:600ddb4e08a5091a94c49a",
  measurementId: "G-M2G3FD1QTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
