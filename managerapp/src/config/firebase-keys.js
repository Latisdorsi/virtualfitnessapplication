import firebase from 'firebase/app';
import 'firebase/storage';
const config = {
  apiKey: "AIzaSyCOKt7hmAt3-qjGpGzwRAslYpp1INK1QGQ",
  authDomain: "virtualfitnessapp.firebaseapp.com",
  databaseURL: "https://virtualfitnessapp.firebaseio.com",
  projectId: "virtualfitnessapp",
  storageBucket: "virtualfitnessapp.appspot.com",
  messagingSenderId: "504147697326"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
  storage, firebase as default
};