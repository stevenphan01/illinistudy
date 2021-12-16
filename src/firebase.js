import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBagH7kjDcrBsqLyHLep7iFx61Tb_9HceI",
  authDomain: "workshop-demo1.firebaseapp.com",
  projectId: "workshop-demo1",
  storageBucket: "workshop-demo1.appspot.com",
  messagingSenderId: "695780177308",
  appId: "1:695780177308:web:8ebcd59b54255eac240459"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function checkUser(funct) {
  auth.onAuthStateChanged(function(user) {
    if(user) {
      funct();
    }
  })
}

function userSignOut(funct) {
  auth.signOut(auth)
  .then(() => {alert("Signed Out Successfully."); funct();})
  .catch((error) => {alert("Error: " + error)});
}

function createUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        alert("Created Account Successfully.")
    })
    .catch((error) => {
        alert("Error: " + error);
  });
};

function signIn(funct, email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signed In Successfully.")
      funct();
    })
    .catch((error) => {
      alert("Error: " + error);
    });
};

export { createUser, signIn, checkUser, userSignOut };