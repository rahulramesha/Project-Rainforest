import React from 'react'
import classNames from 'classnames'

import { SalesForm } from './SalesForm'

import styles from './ItemSales.scss'

export const ItemSales = props => {

    const className = classNames(props.className && props.className, styles.itemSalesContent)

    return <div className={className}>
        <SalesForm itemData={props.itemData} />
    </div>
}