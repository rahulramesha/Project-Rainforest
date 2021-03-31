import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

import { ItemTitle } from './ItemTitle'
import { ItemVisual } from './ItemVisual'
import { ItemDescription } from './ItemDescription'
import { ItemSales } from './ItemSales'

import { fetchItem } from '../../store/actions/item'

import styles from './Item.scss'

export const Item = () => {

    const location = useLocation()
    const itemData = useSelector(state => state.item.itemData)
    const dispatch = useDispatch()

    const params = new URLSearchParams(location.search)
    const itemId = params.get('itemId')

    useEffect(() => {
        if(itemData && itemData.name)
            document.title = itemData.name
        else 
        document.title = 'item'
    }, [])

    useEffect(()=> {
        if(!itemData || itemId !== itemData.id)
            dispatch(fetchItem(itemId))
    }, [itemId])

    return <div className={styles.item}>
        {itemData && <div className={styles.itemContainer}>
            <ItemVisual itemImages={itemData.itemImages} name={itemData.name}/>
            <div className={styles.itemContent}>
                <ItemTitle itemData={itemData} />
                <ItemDescription description={itemData.description}/>
                <ItemSales itemData={itemData} />
            </div>
        </div>}
    </div>
}