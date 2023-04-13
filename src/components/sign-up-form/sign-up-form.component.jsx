import './sign-up-form.styles.scss'

import { createAuthUserEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { useContext, useState } from "react"

import Button from '../button/button.component'
import FormInput from "../form-input/form-input.component"
import { UserContext } from '../../contexts/user.context'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields
    const { setCurrentUser, currentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            alert("password do not match")
            return
        }

        try {
            const {user} = await createAuthUserEmailAndPassword(email, password)
            setCurrentUser(user)
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()
            console.log('current', currentUser)
        }
        catch(e) {
            if(e.code === 'auth/email-already-in-use') {
                alert("Cannot create user, email already in use")
            } 
            else console.log('user creation encountered an error', e)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({
            ...formFields, [name]: value
        })
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" value={displayName} onChange={handleChange}/>
                <FormInput label="Email" type="email" name="email" value={email} onChange={handleChange}/>
                <FormInput label="Password" type="password" name="password" value={password} onChange={handleChange}/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm