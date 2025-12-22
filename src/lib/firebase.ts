
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Configuration for PSI Real Estate Firebase Project
const firebaseConfig = {
  apiKey: "AIzaSyCh8BZUyZGCKMPgRAJHG1uyBsl6tkVvrW0",
  authDomain: "crm-preview-1479282468386.firebaseapp.com",
  projectId: "crm-preview-1479282468386",
  storageBucket: "crm-preview-1479282468386.firebasestorage.app",
  messagingSenderId: "412114535579",
  appId: "1:412114535579:web:6a98970e5b5a8b7e7d323e",
  measurementId: "G-4J9GK4SWEB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn('Firestore persistence failed-precondition');
    } else if (err.code == 'unimplemented') {
      console.warn('Firestore persistence unimplemented');
    }
  });
}

export const auth = getAuth(app);
