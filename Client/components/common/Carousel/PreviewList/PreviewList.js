import React from 'react'
import ClassNames from 'classnames'

import styles from './PreviewList.scss'

export const PreviewList = props => {
    return (
        <div className={styles.previewListContainer}>
            <ul className={styles.previewIconList}>
                { React.Children.map(props.children, (child, i) => {

                    const className = ClassNames(styles.previewIcon, i === props.selected && styles.selected)

                    return <li className={styles.previewIconListItem} onClick={() => props.onListClick(i)}>
                        {React.cloneElement(child, {className})}
                    </li>
                })}
                
            </ul>
        </div>
    )
}