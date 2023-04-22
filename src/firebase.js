import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB5uYCEe17bWgwbzNpUW3gzsz4XNv0L2c0",
  authDomain: "react-1cb0f.firebaseapp.com",
  projectId: "react-1cb0f",
  storageBucket: "react-1cb0f.appspot.com",
  messagingSenderId: "293192827166",
  appId: "1:293192827166:web:02e3eb38f7d8a770d0890f",
});
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  await signOut(auth);
};

export {
  auth,
  db,
  storage,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
