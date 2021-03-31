import React from 'react'

import Stars from '../../common/stars/Stars'

import styles from './ItemTitle.scss'

export const ItemTitle = props => {

    return <div className={styles.itemTitleContainer}>
        <h2>{props.itemData.name}</h2>
        <div className={styles.ratingContainer}>
            <Stars avgRating={props.itemData.avgRating}/>
            <p>{`  ${props.itemData.avgRating} from ${props.itemData.numRatings} Reviews`}</p>
        </div>
        
    </div>
}