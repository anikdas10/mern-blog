// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "mern-blog-bd.firebaseapp.com",
  projectId: "mern-blog-bd",
  storageBucket: "mern-blog-bd.firebasestorage.app",
  messagingSenderId: "676255695290",
  appId: "1:676255695290:web:7bfb7ebff1c4994e94dd83",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}
