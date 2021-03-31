import React, { useEffect } from 'react'

import { ItemList } from './ItemList'

import styles from './Home.scss'

export const Home = () => {

    useEffect(() => {
        document.title = 'Home'
    }, [])

    return <div className={styles.home} >
        <h2>Home</h2>
        <ItemList />
    </div>
}