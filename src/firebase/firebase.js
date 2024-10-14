// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAnDYJAld3-5aJ5XUKbl2P9JVKf495ees",
  authDomain: "restaurant-management-sy-1a0cd.firebaseapp.com",
  projectId: "restaurant-management-sy-1a0cd",
  storageBucket: "restaurant-management-sy-1a0cd.appspot.com",
  messagingSenderId: "1022501088852",
  appId: "1:1022501088852:web:a1972567b84a1d8b47c7c1",
  measurementId: "G-QFF26Q0F6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);