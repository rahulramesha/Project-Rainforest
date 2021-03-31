import React from 'react'

import styles from './TopMessage.scss'

export const TopMessage = props => {

    const { forwardRef, ...other } = props

    return (
        <div ref={forwardRef} className={styles.message} {...other}>
            <p>This is an important message</p>
        </div>
        
    )
}