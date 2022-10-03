// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw-0xjZaJoN5VzQjtYSUKVq0MrJD1pZ9Y",
  authDomain: "app-chat-reactjs.firebaseapp.com",
  projectId: "app-chat-reactjs",
  storageBucket: "app-chat-reactjs.appspot.com",
  messagingSenderId: "651274911055",
  appId: "1:651274911055:web:87e864bdab51f26f09193a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();