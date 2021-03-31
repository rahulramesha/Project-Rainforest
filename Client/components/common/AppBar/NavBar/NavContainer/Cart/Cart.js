import React from 'react'

import { CartIcon } from '../../../../../icons'

import styles from './Cart.scss'

export const Cart = () =>{
    return (
    <div className={styles.cart}>
        <div className={styles.itemCount}>0</div>
        <CartIcon className={styles.cartIcon} />
    </div>)
}