import React from 'react';
import { useEffect, useState, useRef } from 'react'
import classNames from 'classnames'

import { TopMessage } from './TopMessage'
import { NavBar } from './NavBar'

import styles from './AppBar.scss'

export const AppBar = () => {

    const [isSticky, setisSticky] = useState()
    const brandRef = useRef(null)
    const navBarRef = useRef(null)

    const stickyClassName = classNames(isSticky && styles.stickyStyles, styles.bar);

    const handleScroll= () => {
        const brandHeight = brandRef.current.clientHeight

        setisSticky(window.scrollY > brandHeight ? true: false)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll',handleScroll)
    },[]) 

    return (
        <div className={styles.appBar}>
            <TopMessage forwardRef={brandRef} style={{marginBottom: isSticky? navBarRef.current.clientHeight + 5: 0}} />
            <NavBar forwardRef={navBarRef} className={stickyClassName} />
        </div>
        
    )
    

}