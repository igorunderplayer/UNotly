import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { config } from "./config";

const firebaseConfig = {
  apiKey: config.get("VITE_FIREBASE_API_KEY"),
  authDomain: config.get("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: config.get("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: config.get("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: config.get("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: config.get("VITE_FIREBASE_APP_ID"),
  measurementId: config.get("VITE_FIREBASE_MEASUREMENT_ID"),
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, auth, firestore };
