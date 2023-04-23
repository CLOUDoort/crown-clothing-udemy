import { createContext, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

import { useEffect } from "react";

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = { currentUser, setCurrentUser }
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            // 로그아웃하면 null 저장, 로그인하면 객체를 저장
            if(user) createUserDocumentFromAuth(user)
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}