import './sign-in-form.styles.scss'

import { createUserDocumentFromAuth, signInAuthUserEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils"

import Button from '../button/button.component'
import FormInput from "../form-input/form-input.component"
import { useState } from "react"

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { user } = await signInAuthUserEmailAndPassword(email, password)            
            resetFormFields()
        }
        catch(e) {
            switch(e.code) {
                case 'auth/wrong-password':
                    alert("incorrect password for email")
                    break
                case 'auth/user-not-found':
                    alert("no user associated with this email")
                    break;
                default: console.log(e)
            }
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({
            ...formFields, [name]: value
        })
    }
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
         
    }   

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" name="email" value={email} onChange={handleChange}/>
                <FormInput label="Password" type="password" name="password" value={password} onChange={handleChange}/>
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm