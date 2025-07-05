import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCn-3ii0YyEL0-Ger8pwwdhRTIGUT-ZuRo",
  authDomain: "firstaid-81e37.firebaseapp.com",
  projectId: "firstaid-81e37",
  storageBucket: "firstaid-81e37.firebasestorage.app",
  messagingSenderId: "591769492511",
  appId: "1:591769492511:web:d385349d369fb0440dc92a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
