// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHGYl8sCR2rm4ZyT48I2KodlNSbRuUnsk",
  authDomain: "andhacks-11-dev.firebaseapp.com",
  projectId: "andhacks-11-dev",
  storageBucket: "andhacks-11-dev.firebasestorage.app",
  messagingSenderId: "1068268153745",
  appId: "1:1068268153745:web:f898adc1fd33d2ac804830"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default function SignOn()  {
    function sendForm(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}
    return (
        <form action={sendForm}>
        <input name="email" />
        <input type="password" name="password" />
        <button type="submit">Create Account</button>
        </form>
    )
}