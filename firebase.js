import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQpTU2Kop-06FjpCv_e4odmDNlLGMuGDE",
  authDomain: "g-docs-clone-50172.firebaseapp.com",
  projectId: "g-docs-clone-50172",
  storageBucket: "g-docs-clone-50172.appspot.com",
  messagingSenderId: "775587336479",
  appId: "1:775587336479:web:ebddaff4a00fadd15ae02a",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
