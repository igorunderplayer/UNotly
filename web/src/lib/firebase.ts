import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2RvUESYEY3njTBwBDc1hefzY2UftLBS0",
  authDomain: "mynotes-333ca.firebaseapp.com",
  projectId: "mynotes-333ca",
  storageBucket: "mynotes-333ca.appspot.com",
  messagingSenderId: "62348278998",
  appId: "1:62348278998:web:3f6589a089e9fc89e65d77",
  measurementId: "G-QN1KWFB6L5"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const auth = getAuth(app)

export { app, auth, firestore };

