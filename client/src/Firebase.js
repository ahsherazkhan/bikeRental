// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtx5JFlp5TSqqVlTmEFhjmixMVGyMxxSU",
  authDomain: "testproject-81918.firebaseapp.com",
  projectId: "testproject-81918",
  storageBucket: "testproject-81918.appspot.com",
  messagingSenderId: "639771586512",
  appId: "1:639771586512:web:120505e0a6448dc1bf93d5",
  measurementId: "G-715V046WP7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
