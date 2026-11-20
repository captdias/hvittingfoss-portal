import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// LIM INN DINE EGNE FIREBASE-NØKLER HER:
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNXKRuT9yo15ybxC05efCFzjSNw4RDFos",
  authDomain: "hvittingfoss-alpinklubb-portal.firebaseapp.com",
  projectId: "hvittingfoss-alpinklubb-portal",
  storageBucket: "hvittingfoss-alpinklubb-portal.firebasestorage.app",
  messagingSenderId: "803459874191",
  appId: "1:803459874191:web:4a66c83179508bfc939ffa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
