import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyD1r8zPrS8HAJmNTvfMXWepF8srdQZC-_E",
  authDomain: "fitness-first-i8adq.firebaseapp.com",
  projectId: "fitness-first-i8adq",
  storageBucket: "fitness-first-i8adq.firebasestorage.app",
  messagingSenderId: "65240765574",
  appId: "1:65240765574:web:5b4a755fddacd5404ded07"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db} ;