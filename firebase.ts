// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD77qnI8yc-EoqBNz1dwk4XatHlUIKYss",
  authDomain: "signal-clone-7fe53.firebaseapp.com",
  projectId: "signal-clone-7fe53",
  storageBucket: "signal-clone-7fe53.appspot.com",
  messagingSenderId: "933270729820",
  appId: "1:933270729820:web:556f5ec8f2c6a91727e299",
  measurementId: "G-CDVMJLYSBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);