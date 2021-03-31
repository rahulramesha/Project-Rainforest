import React from 'react'

import { currencyConstants } from '../../../common/currencyConstants'

import styles from './ListItem.scss'

export const ListItem = ({data, handleClick}) => {

    const { name, itemImages, price, currency } = data

    return <div className={styles.listItem}
                onClick={() => handleClick(data)}>
        <img src={itemImages[0]} style={{width: '100%'}} alt={`image of ${name}`}/>
        <div className={styles.itemInfo}>
            <p>{name}</p>
            <p>
                <span dangerouslySetInnerHTML={{ __html: currencyConstants[currency] }} />
                <span>&nbsp;{price}</span>
            </p>
        </div>
    </div>
}