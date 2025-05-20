// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBG1J1lNlm_jc0Cz_iLkNFtcP8S0Rq5ZtI",
  authDomain: "studme-6240.firebaseapp.com",
  projectId: "studme-6240",
  storageBucket: "studme-6240.firebasestorage.app",
  messagingSenderId: "805465697564",
  appId: "1:805465697564:web:a4f1cb270895ea078a5ed9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
signInAnonymously(auth).catch(console.error);