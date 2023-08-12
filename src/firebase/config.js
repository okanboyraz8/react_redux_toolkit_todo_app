// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAR_EjbRmrpz8yXZoUQGHCe1QYjzD55JCE",
    authDomain: "rrt-todo.firebaseapp.com",
    projectId: "rrt-todo",
    storageBucket: "rrt-todo.appspot.com",
    messagingSenderId: "142327006187",
    appId: "1:142327006187:web:72765cfffe7b5e985d4fae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db }