import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        createUserDocumentFromAuth(user)
    }   
    return (
        <div>
            <h1>sign in</h1>
            <button onClick={logGoogleUser}>
                Sign in with google PopUp
            </button>
        </div>
    )
}

export default SignIn