import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Classnames from 'classnames'

import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

import { authenticateOrCreateCustomer } from '../../store/actions/customer'

import styles from './AuthForm.scss'

export const AuthForm = () => {

    const [ isSignup, setSignUp ] = useState(false)

    const history = useHistory()

    const dispatch = useDispatch()

    const errorData = useSelector(state => state.error.errorData)
    const isLoggedIn = useSelector(state => state.customer.isLoggedIn)

    const formsClassName = Classnames(isSignup && styles.selectSignup, styles.forms)

    const loginFormClassName = Classnames(styles.form, styles.loginForm)
    const signupFormClassName = Classnames(styles.form, styles.signupForm)

    const loginButtonClassName = Classnames( !isSignup && styles.selectedSwitch, styles.switchButton)
    const signupButtonClassName = Classnames( isSignup && styles.selectedSwitch, styles.switchButton)

    useEffect(() => {
        document.title = 'Login/Signup'
    }, [])

    useEffect(() => {
        if(isLoggedIn && history.length > 2) {
            history.goBack()
        } else if(isLoggedIn) {
            history.replace('/ssr/home')
        }
    }, [isLoggedIn])

    const setLogin = e => {
        setSignUp(false)
    }

    const setSignup = e => {
        setSignUp(true)
    }

    const submitForAuth = (isSignup) => {
        
        return (data) => {
            dispatch(authenticateOrCreateCustomer(data, isSignup))
        }
    }

    return <div className={styles.authForm}>
        <div className={styles.formContainer}>
            <div className={styles.formSwitch}>
                <button className={loginButtonClassName} onClick={setLogin} aria-label='opens login tab'>
                    Login
                </button>
                <button className={signupButtonClassName} onClick={setSignup} aria-label='opens signup tab'>
                    SignUp
                </button>
            </div>
            <div className={formsClassName}>
                <LoginForm className={loginFormClassName}
                    submit={submitForAuth(false)}
                    buttonStyleClass={styles.formButton}
                    errorData={errorData}/>
                <SignupForm className={signupFormClassName}
                    submit={submitForAuth(true)}
                    buttonStyleClass={styles.formButton}
                    errorData={errorData}/>
            </div>
        </div>
    </div>
    
}