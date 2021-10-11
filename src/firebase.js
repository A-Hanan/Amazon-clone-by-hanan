// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAVK93SEliDxdwBuDtVHmm_xeBTy3RuvRM",
  authDomain: "clone-fc276.firebaseapp.com",
  projectId: "clone-fc276",
  storageBucket: "clone-fc276.appspot.com",
  messagingSenderId: "471739835743",
  appId: "1:471739835743:web:05fbfa5c9c5b90e00fc2ea",
  measurementId: "G-F9EXY81RQC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
