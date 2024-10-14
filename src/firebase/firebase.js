import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDAnDYJAld3-5aJ5XUKbl2P9JVKf495ees",
  authDomain: "restaurant-management-sy-1a0cd.firebaseapp.com",
  projectId: "restaurant-management-sy-1a0cd",
  storageBucket: "restaurant-management-sy-1a0cd.appspot.com",
  messagingSenderId: "1022501088852",
  appId: "1:1022501088852:web:a1972567b84a1d8b47c7c1",
  measurementId: "G-QFF26Q0F6K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);