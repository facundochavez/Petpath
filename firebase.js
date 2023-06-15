import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: 'paw-explorer.firebaseapp.com',
  projectId: 'paw-explorer',
  storageBucket: 'paw-explorer.appspot.com',
  messagingSenderId: '1040793547624',
  appId: '1:1040793547624:web:b368befa6dc24bcc0c9cdd'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
