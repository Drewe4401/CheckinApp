// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZDvcM-y-DN8PMGtbNsD1RSf0OOUaIthY",
  authDomain: "checkinapp-135b8.firebaseapp.com",
  projectId: "checkinapp-135b8",
  storageBucket: "checkinapp-135b8.appspot.com",
  messagingSenderId: "288084652278",
  appId: "1:288084652278:web:6d7b7fff5a66b14b2f3cd7",
  measurementId: "G-ZRD434EF14"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else{
    app = firebase.app()
}

const auth = firebase.auth();

export { auth };
