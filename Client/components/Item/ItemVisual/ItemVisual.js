import React from 'react'

import { Carousel } from '../../common/Carousel'

import styles from './ItemVisual.scss'

export const ItemVisual = props => {

    return <div className={styles.itemImages}>
        <Carousel style={{width: '100%', height: '100%'}}>
            {props.itemImages.map((item, i) => {
                return <img key={i} src={item} alt={`image number ${i+1} of ${props.name}`}/>
            })}
        </Carousel>
        
    </div>

}