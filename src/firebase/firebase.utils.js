import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBEZYFjnGqumJ3c9fAqRF1yxT4OXCv7t1o",
  authDomain: "reactstuff-e7543.firebaseapp.com",
  databaseURL: "https://reactstuff-e7543.firebaseio.com",
  projectId: "reactstuff-e7543",
  storageBucket: "reactstuff-e7543.appspot.com",
  messagingSenderId: "310469338097",
  appId: "1:310469338097:web:e2a50816c7411288e35a50"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export default firebase;
