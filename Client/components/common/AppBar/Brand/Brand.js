import React from 'react'

import { ZonIcon } from '../../../icons'

import styles from './Brand.scss'

export const Brand = () => {

    return (
        <div className={styles.brand}>
            <ZonIcon className={styles.zonIcon} />
            <h1>Project Zon</h1>
        </div>   
    )
}