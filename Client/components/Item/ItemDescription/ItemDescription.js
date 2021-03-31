import React from 'react'

import styles from './ItemDescription.scss'

export const ItemDescription = props => {

    return <div className={styles.itemDescription}>
        <p>{props.description}</p>
        <p>{props.description}</p>
    </div>
}