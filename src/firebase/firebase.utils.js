import { initializeApp } from "firebase/app";
import {
  addDoc,
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyAqjJMnesTS7H9TSBHJXquulFEdvaEtjy4",
  authDomain: "crwn-clothing-db-7d3eb.firebaseapp.com",
  projectId: "crwn-clothing-db-7d3eb",
  storageBucket: "crwn-clothing-db-7d3eb.appspot.com",
  messagingSenderId: "87153834863",
  appId: "1:87153834863:web:e7f28fd56bba04e3ee469a",
  measurementId: "G-Q89GTH37CE",
});

export const auth = getAuth(app);
export const db = getFirestore(app);

// Google SignIn
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Create cart document
    const cartRef = await addDoc(collection(db, "carts"), {
      cartItems: [],
    });

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        cartId: cartRef.id,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

//
export const addCollectionAndDocuments = async (objectsToAdd) => {
  const batch = writeBatch(db);

  const newDocRef = await doc(collection(db, "collections"));

  const { title, items } = objectsToAdd;

  batch.set(newDocRef, {
    title: title,
    items: items,
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Getting the current user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        resolve(user);
      } else {
        // User is signed out
        reject();
      }
    });
    unsubscribe();
  });
};
