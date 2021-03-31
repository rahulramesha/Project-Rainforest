import React, { useState } from 'react'
import Classnames from 'classnames'

import { FormText } from '../../common/FormComponents'

export const LoginForm = props => {

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setpasswordValue] = useState('')

    const className = Classnames(props.className)

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            email: emailValue,
            password: passwordValue
        }
        
        props.submit(data)
    }
    

    return <form className={className} onSubmit={handleSubmit}>
        <FormText name='email' 
            id='login_email' 
            value={emailValue}
            setValue={setEmailValue}
            placeholder='Email'
            error={props.errorData}/>
        <FormText name='password' 
            id='login_password'
            value={passwordValue}
            setValue={setpasswordValue}
            placeholder='Password'
            type='password'
            error={props.errorData}/>
        <button type='submit' className={props.buttonStyleClass} aria-label='submit login form'>
            Login
        </button>   
    </form>
    
}