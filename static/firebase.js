// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { switchButtons, showLoginToast, showLogoutToast, createUserUIDCookie } from "./ui.js";

const firebaseConfig = {
  apiKey: "AIzaSyDe0nzpG11NNzNJ-xRVMtsjUNJJ_f-Llck",
  authDomain: "project0sloth.firebaseapp.com",
  projectId: "project0sloth",
  storageBucket: "project0sloth.appspot.com",
  messagingSenderId: "759800168236",
  appId: "1:759800168236:web:a32b2665769c2ea5a07689"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

//  <------------- custom functions ------------->
export function checkuser() {
  return auth.currentUser ? true : false; // return true if user is signed in
}

export function getCurrentUser() {
  return auth.currentUser.uid;
}

export function getPfp() {
  if (auth.currentUser) {
    return auth.currentUser.photoURL; // return true if user is signed in  
  }
  else {
    return null;
  }
}

// <------------- Firestore Functions ------------->
export async function setData(value) {
  try {
    const uid = auth.currentUser.uid;
    if (!uid) {
      return null;
    }
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, value); // Wait for setDoc to complete
    console.log("Doc was set successfully!");
    return true; // Indicate success
  } catch (error) {
    console.log("Error setting doc:", error);
    return false; // Indicate failure
  }
}

//  <------------- Storage Functions ------------->
export async function uploadImgAndGetURL(fileName, file) {
  try {
    const uid = auth.currentUser.uid;
    
    if(!uid){
      return null;
    }
    
    const storageRef = ref(storage, `users/${uid}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Wait for the upload task to complete
    await uploadTask;

    return getDownloadURL(uploadTask.snapshot.ref);
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

//  <------------- Auth Functions ------------->
export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log("User signed in:", user);
      showLoginToast(user.displayName);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Sign-in error:", errorMessage);
    });
}

export function signOutUser() {
  signOut(auth).then(() => {
    // signed out 
    console.log("user signed out!");
    showLogoutToast();
  })
  .catch(() => {
    // error occured
    // TODO: use toast from bootstrap to show that an error occured and you couldn't signout currently!    
  })
}

// <------------- auth state change ------------->
onAuthStateChanged(auth, (user) => {
  switchButtons()  // --> switch buttons on login
  if (user) {
    // User is signed in, refer: https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    createUserUIDCookie(uid);
  } else {
    // User is signed out
  }
});