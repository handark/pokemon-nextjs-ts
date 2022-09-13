// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByOOHcGZgc1eQW7BID7mINwJD6yGGdhno",
  authDomain: "pokedex-jose.firebaseapp.com",
  projectId: "pokedex-jose",
  storageBucket: "pokedex-jose.appspot.com",
  messagingSenderId: "79809914610",
  appId: "1:79809914610:web:101b89e1ba438a51a2d26b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
