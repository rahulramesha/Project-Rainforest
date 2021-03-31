import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ListItem } from './ListItem'

import styles from './ItemList.scss'

import { fetchItemsForHome } from '../../../store/actions/item'

export const ItemList = () => {

    const itemList = useSelector(state => state.item.itemsList)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = itemData => {
        history.push({
            pathname: '/ssr/item',
            search: `?itemId=${itemData.id}`,
            state: { itemData: itemData }
        })
    }

    useEffect(() => {
        if(!(itemList && itemList.length !==0)) {
            //Kitchen as default
            dispatch(fetchItemsForHome('Kitchen'))
        }
    }, [])

    return (itemList && itemList.length >= 0) ?
            <React.Fragment>
                <h3>Featured :</h3>
                <div className={styles.itemList}>
                    {itemList.map( itemData => 
                        <ListItem key={itemData.id}
                            data={itemData}
                            handleClick={handleClick}/>)
                    }
                </div>
            </React.Fragment>
             :
            <p>
                Error loading items
            </p>

}