// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSJlVMisIUpafbiyzh4GfxID8xNlg2ozw",
  authDomain: "pulse-healt.firebaseapp.com",
  databaseURL: "https://pulse-healt-default-rtdb.firebaseio.com",
  projectId: "pulse-healt",
  storageBucket: "pulse-healt.appspot.com",
  messagingSenderId: "694998352109",
  appId: "1:694998352109:web:a92a4695ce91121aabcce4",
  measurementId: "G-VB536730PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);