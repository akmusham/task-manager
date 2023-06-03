import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlUsiGjpUMQ-D4suQMHq-LHGtt0JXy7mA",
  authDomain: "auditwebapp-c8888.firebaseapp.com",
  projectId: "auditwebapp-c8888",
  storageBucket: "auditwebapp-c8888.appspot.com",
  messagingSenderId: "304223492099",
  appId: "1:304223492099:web:d59c48f62f8603edf9d636",
  measurementId: "G-86GD34427V"
};

// Initialize Firebase
const FireBase = initializeApp(firebaseConfig);

var db = getFirestore(FireBase); 
export {FireBase, db}