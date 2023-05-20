import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_PROJECT_KEY,
  authDomain: "bloggit-c8dd1.firebaseapp.com",
  projectId: "bloggit-c8dd1",
  storageBucket: "bloggit-c8dd1.appspot.com",
  messagingSenderId: "406891211397",
  appId: "1:406891211397:web:4d8e4ec86f5bbf580997ec",
  measurementId: "G-303B3QKN9P",
  databaseURL: import.meta.env.VITE_FIREBASE_RTDB_URL
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
