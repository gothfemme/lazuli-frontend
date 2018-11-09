import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB0wQbaWpV3rwZIOmtwzhqkdvNc1z17hBk",
  authDomain: "lazuli-d0e49.firebaseapp.com",
  databaseURL: "https://lazuli-d0e49.firebaseio.com",
  projectId: "lazuli-d0e49",
  storageBucket: "lazuli-d0e49.appspot.com",
  messagingSenderId: "688267121327"
};
firebase.initializeApp(config);

export default config