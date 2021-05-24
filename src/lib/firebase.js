import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCS3vwG1tGMOs-Oazrcufo12ja7BByG9AU',
  authDomain: 'tailwind-facebook-2.firebaseapp.com',
  projectId: 'tailwind-facebook-2',
  storageBucket: 'tailwind-facebook-2.appspot.com',
  messagingSenderId: '41211001450',
  appId: '1:41211001450:web:47bd8bf34bb99f18ffe813',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { auth, db, storage, timestamp };
