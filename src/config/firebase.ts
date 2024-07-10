// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmViwY0RaGTMfBtyuiRAm-qmsF_DGus1Y",
  authDomain: "react-pos-1108d.firebaseapp.com",
  projectId: "react-pos-1108d",
  storageBucket: "react-pos-1108d.appspot.com",
  messagingSenderId: "673686862915",
  appId: "1:673686862915:web:b3279b241a598bf169e8f6",
  measurementId: "G-69DVSP1J50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;