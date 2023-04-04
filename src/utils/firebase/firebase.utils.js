import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCimM4t9c7SM5yRcckR2V1VcowqUGcbfok",
    authDomain: "crown-clothing-db-f56a8.firebaseapp.com",
    projectId: "crown-clothing-db-f56a8",
    storageBucket: "crown-clothing-db-f56a8.appspot.com",
    messagingSenderId: "224309605090",
    appId: "1:224309605090:web:8bf9317363a2d08bf264bb"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log('userSnapshot', userSnapshot)
    console.log('userSnapshot', userSnapshot.exists())
  }