import React from 'react'

import { currencyConstants } from '../../../common/currencyConstants'

import styles from './SalesForm.scss'

export const SalesForm = props => {

    return (
        <form className={styles.salesForm} onSubmit={e => e.preventDefault()}>
            <input type='hidden' id='itemId' name='itemId' value={props.itemData.id} />
            <label>
                <span dangerouslySetInnerHTML={{ __html: currencyConstants[props.itemData.currency] }} />
                <span>&nbsp;{props.itemData.price}</span>
            </label>
            <input type='hidden' name='price' value={props.itemData.price} />
            <input type='submit' value='ADD TO BAG'/>
        </form>
    )
}