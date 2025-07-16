/* firebase.js, 7/16/25 -- Firebase setup code shared between React components for the &hacks XI portal
 * Per Firebase's documentation (https://firebase.google.com/docs/projects/api-keys), API keys don't need to
 * be treated as secret. Hence, they're stored here. Accessing variables in .env from React/webpack can technically
 * be accomplished but seems like more trouble than it's really worth.
 */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHGYl8sCR2rm4ZyT48I2KodlNSbRuUnsk",
  authDomain: "andhacks-11-dev.firebaseapp.com",
  projectId: "andhacks-11-dev",
  storageBucket: "andhacks-11-dev.firebasestorage.app",
  messagingSenderId: "1068268153745",
  appId: "1:1068268153745:web:f898adc1fd33d2ac804830"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; /* export the Firebase SDKs that this app uses */