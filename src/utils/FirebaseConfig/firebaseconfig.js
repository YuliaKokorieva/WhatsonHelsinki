import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA5ad2mTPWg-AlIe1TW3N3TzFguiVrZGak",
  authDomain: "helsinkievents-29262.firebaseapp.com",
  databaseURL: "https://helsinkievents-29262-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "helsinkievents-29262",
  storageBucket: "helsinkievents-29262.appspot.com",
  messagingSenderId: "1052815759476",
  appId: "1:1052815759476:web:4fceb862855dbb766e1921"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
