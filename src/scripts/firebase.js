// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


console.log('API KEY ' + import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyDHGYl8sCR2rm4ZyT48I2KodlNSbRuUnsk",
  authDomain: "andhacks-11-dev.firebaseapp.com",
  projectId: "andhacks-11-dev",
  storageBucket: "andhacks-11-dev.firebasestorage.app",
  messagingSenderId: "1068268153745",
  appId: "1:1068268153745:web:f898adc1fd33d2ac804830"
};

console.log('KEY confirmed: ' + firebaseConfig.apiKey);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };