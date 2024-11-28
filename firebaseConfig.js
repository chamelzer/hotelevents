// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7SJ6TjXsD9_GjW6GOJcNBDI61w1Byyk0",
  authDomain: "hotelevents-3ef54.firebaseapp.com",
  databaseURL: "https://hotelevents-c5779-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hotelevents-c5779",
  storageBucket: "hotelevents-c5779.appspot.com",
  messagingSenderId: "931209889996",
  appId: "1:931209889996:web:3e5b03a0b10fb6562d1a69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);