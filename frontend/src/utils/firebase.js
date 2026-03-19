import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "prepwise-829c3.firebaseapp.com",
  projectId: "prepwise-829c3",
  storageBucket: "prepwise-829c3.firebasestorage.app",
  messagingSenderId: "864054795862",
  appId: "1:864054795862:web:ace94738721bd2b76be5f7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider}