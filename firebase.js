
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5g97RxY-6TupXs6U_aBBBpM36H9FZ-xI",
  authDomain: "netflix-clone-e8163.firebaseapp.com",
  projectId: "netflix-clone-e8163",
  storageBucket: "netflix-clone-e8163.appspot.com",
  messagingSenderId: "310701712551",
  appId: "1:310701712551:web:cc4f542937a43595f96782"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name, 
      authProvider: "local", 
      email, 
    });
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const login = async(email, password)=>{
  try{
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logout= ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout};