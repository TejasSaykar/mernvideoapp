import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyA9vzhXmkEczCwserb6QnFAOQ8O9-1nUO4",
    authDomain: "reactvideoapp-afcbb.firebaseapp.com",
    projectId: "reactvideoapp-afcbb",
    storageBucket: "reactvideoapp-afcbb.appspot.com",
    messagingSenderId: "449109314160",
    appId: "1:449109314160:web:b81a557dafc01b787a42b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const provider = new GoogleAuthProvider();

export default app;