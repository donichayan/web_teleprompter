// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import firebase from firebaseConfig;
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRwN9aLSbvFc2AIwtGwJor7gE0vhrfFsQ",
  authDomain: "fashion-prototype-668c6.firebaseapp.com",
  projectId: "fashion-prototype-668c6",
  storageBucket: "fashion-prototype-668c6.appspot.com",
  messagingSenderId: "833267280888",
  appId: "1:833267280888:web:06f611e975d86f01a7440d",
  measurementId: "G-RJ11F6GQM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app)
//export default firebase;