// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
// import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcgt-Waf-N2gAQ-mxKDkEkGfA43ixw8Co",
  authDomain: "instagram-clone-react-dda40.firebaseapp.com",
  projectId: "instagram-clone-react-dda40",
  storageBucket: "instagram-clone-react-dda40.appspot.com",
  messagingSenderId: "218860762529",
  appId: "1:218860762529:web:dc794c26b7d6b4a4ab07e0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
