import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "petpath-e1b32.firebaseapp.com",
  projectId: "petpath-e1b32",
  storageBucket: "petpath-e1b32.appspot.com",
  messagingSenderId: "743353334033",
  appId: "1:743353334033:web:14bf4b29ff0c908ee1f4b0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();