import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Optional if you want login later
// import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAAnBR5n9fzJxnN6ShdjC3HfX579VQOf4Y",
  authDomain: "kc-carbon.firebaseapp.com",
  projectId: "kc-carbon",
  storageBucket: "kc-carbon.appspot.com", // correct format
  messagingSenderId: "686094602481",
  appId: "1:686094602481:web:850a9c3c55395b2a069950"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const auth = getAuth(app); // optional

export { db };
