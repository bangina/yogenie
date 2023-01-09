// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCka9pbhNwRHZyYQTPHxhkV773eLkvzak",
  authDomain: "yogenie-8b053.firebaseapp.com",
  projectId: "yogenie-8b053",
  storageBucket: "yogenie-8b053.appspot.com",
  messagingSenderId: "60523915287",
  appId: "1:60523915287:web:40f79a3e7516de27bb1452",
  measurementId: "G-9N7NR5P67S",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const db = getFirestore(app);

const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
