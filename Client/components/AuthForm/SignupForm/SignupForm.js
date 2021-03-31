import React, { useState } from 'react'
import Classnames from 'classnames'

import { FormText, FormDropdown } from '../../common/FormComponents'

import { countryCodes } from './countryCodes'

export const SignupForm = props => {

    const [emailValue, setEmailValue] = useState('')
    const [firstNameValue, setFirstNameValue] = useState('')
    const [lastNameValue, setLastNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [phoneValue, setPhoneValue] = useState('')
    const [countryCodeValue, setCountryCode] = useState(countryCodes[0].value)

    const className = Classnames(props.className)
    
    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            email: emailValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            password: passwordValue,
            primaryPhoneNumber: phoneValue,
            countryCode: countryCodeValue
        }
        
        props.submit(data)
    }

    return <form className={className} onSubmit={handleSubmit}>
        <FormText name='email' 
            id='signup_email' 
            value={emailValue}
            setValue={setEmailValue}
            placeholder='Email'
            error={props.errorData}/>
        <FormText name='firstName' 
            id='firstName' 
            value={firstNameValue}
            setValue={setFirstNameValue}
            placeholder='First Name'
            error={props.errorData}/>
        <FormText name='lastName' 
            id='lastName' 
            value={lastNameValue}
            setValue={setLastNameValue}
            placeholder='Last Name'
            error={props.errorData}/>
        <FormText name='password' 
            id='signup_password' 
            value={passwordValue}
            setValue={setPasswordValue}
            placeholder='Password'
            type='password'
            error={props.errorData}/>
        <FormText name='phone' 
            id='primaryPhoneNumber' 
            value={phoneValue}
            setValue={setPhoneValue}
            placeholder='Phone Number'
            type='tel'
            error={props.errorData}/>
        <FormDropdown name='Country Code'
            dropdownList={countryCodes}
            value={countryCodeValue}
            setValue={setCountryCode}/>
        <button type='submit' className={props.buttonStyleClass} aria-label='submit signup form'>
            Sign up
        </button>
    </form>
    
}