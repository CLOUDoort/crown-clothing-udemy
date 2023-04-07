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
    // 가장 먼저 해야할 것은 기존 문서 참조가 있는지 확인하는 것
    // doc은 데이터베이스에서 문서 검색기능
    // 인자가 3개 필요하다. db, collection, 식별자(고유ID)
    const userDocRef = doc(db, 'users', userAuth.uid)
    // 문서가 없어도 문서 레퍼런스 객체를 리턴해준다. 하지만 데이터가 없기 때문에 가치없는 레퍼펀스
    console.log(userDocRef)

    // getDoc은 데이터에 얻기 위함, 이를 위해 스냅샷을 이용한다.
    // 스냅샷을 통해 데이터베이스 내에 인스턴스가 있는지 확인할 수 있다.
    const userSnapshot = await getDoc(userDocRef)
    console.log('userSnapshot', userSnapshot)
    // 문서가 존재하는지 아닌지 확인하기 위한 메서드, 없으면 false,있으면 true사요ㅕㅇ
    console.log('userSnapshot', userSnapshot.exists())


    // if user data does not exist
    // create / set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth
      const createAt = new Date()

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createAt
        })
      }
      catch(e) {
        console.error("error creating the user", e.message)
      }
    }
    // if user data exists
    return userDocRef
  }