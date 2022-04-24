import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDvjAse7Xec-jzfenwq4xjqbod2_L6leoc",
  authDomain: "helsinkievents-fbbc1.firebaseapp.com",
  projectId: "helsinkievents-fbbc1",
  storageBucket: "helsinkievents-fbbc1.appspot.com",
  messagingSenderId: "179517772655",
  appId: "1:179517772655:web:8fc3c23bf071d988f80e9a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;
