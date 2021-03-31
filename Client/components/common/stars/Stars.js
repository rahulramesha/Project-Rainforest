import React from 'react'
import classNames from 'classnames'

import { StarIcon } from '../../icons'

import styles from './Stars.scss'

export default (props) => {

    const className = classNames( props.className && props.className, styles.stars)

    const percentageWidth = props.avgRating / 5 * 100
    const path = `polygon( 0% 0%,
                    ${percentageWidth}% 0%,
                    ${percentageWidth}% 100%,
                    0% 100%)`

    const stars = []
    for (let i = 1; i <= 5; i++) {
        stars.push(<StarIcon className={styles.star} key={i} />)
    }

    return <div className={className} style={{clipPath: path}}>
        {stars}
    </div>
}