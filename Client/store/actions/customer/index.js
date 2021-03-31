import querystring from 'querystring'

import axios, { deleteCookies } from '../defaultAxios'
import { setError } from '../error'

export const fetchCustomerData = () => async (dispatch) => {

    try{
        const customer = await axios.get(`/api/profile`)
        dispatch(setCustomer(customer.data))
    } catch(err) {
        dispatch(customerNotLoggedIn())
    }
}

export const authenticateOrCreateCustomer = (data, isSignup) => async (dispatch) => {

    try{
        const path = isSignup ? 'signup' : 'localLogin'
        const config = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

        const customer = await axios.post(`/api/${path}`, 
                            querystring.stringify(data),
                            config)

        dispatch(setCustomer(customer.data))
    } catch(err) {
        if(err.response && err.response.data && err.response.data.failureError)
            dispatch(setError(err.response.data.failureError))
    }
}

export const logout = () => (dispatch) => {
    deleteCookies()
    dispatch(customerNotLoggedIn())
}

const setCustomer = (customerData) => {
    return {
        type: 'SET_CUSTOMER',
        payload: customerData
    }
}

const customerNotLoggedIn = () => {
    return {
        type: 'CUSTOMER_NOT_LOGGED_IN'
    }
}