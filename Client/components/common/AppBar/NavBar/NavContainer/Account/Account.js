import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import { PopupController, PopupSelector, PopupContainer} from '../../../../PopUp'

import { fetchCustomerData, logout } from '../../../../../../store/actions/customer'

import styles from './Account.scss'

export const Account = props => {

    const {customerData, isLoggedIn} = useSelector( state => {
        const customerData = state.customer.customerData
        const isLoggedIn = state.customer.isLoggedIn

        return {customerData, isLoggedIn}
    })
    const dispatch = useDispatch()

    const name = isLoggedIn ? customerData.firstName : 'Guest'

    useEffect(() => {
        if(!isLoggedIn)
            dispatch(fetchCustomerData())
    }, [])

    const logOut = e => {
        dispatch(logout())
    }

    return (<PopupController targetContainer={props.navContainerRef}>
        <PopupSelector>
            <li className={styles.account}>
                {isLoggedIn ?
                    <p>{`Hi, ${name}`}</p> :
                    <p>{`Hi, Guest`}</p>}
            </li>
        </PopupSelector>
        <PopupContainer >
            <div className={styles.popup}>
                {isLoggedIn ?
                        <a onClick={logOut}>Logout</a> :
                        <Link to='/ssr/auth'>
                            <p>Login/Signup</p>
                        </Link>}
            </div>
        </PopupContainer>
    </PopupController>)
}