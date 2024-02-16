// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getDatabase,set,ref} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIRwHza6hnMcSywJZUkyGQ0ZoKCVWuhIA",
  authDomain: "nonogram-faadb.firebaseapp.com",
  databaseURL: "https://nonogram-faadb-default-rtdb.firebaseio.com",
  projectId: "nonogram-faadb",
  storageBucket: "nonogram-faadb.appspot.com",
  messagingSenderId: "449915105132",
  appId: "1:449915105132:web:c966a52ea91ba5a7b24d49",
  measurementId: "G-3RGYDH4EHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export  const auth = getAuth(app)
export function writeUserData(userId, name, scoresList, savedGame) {
    set(ref(db, 'users/' + userId), {
        username: name,
        scoreList: [],
        savedGame: [],
    });
}

