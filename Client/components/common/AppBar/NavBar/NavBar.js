import React, {useState, useRef} from 'react'
import ClassNames from 'classnames'

import { NavContainer } from './NavContainer'
import { SlideContainer } from './SlideContainer'

import styles from './NavBar.scss'

export const NavBar = props => {

    const [isSlideBarOpen, setSlideBarOpen] = useState(false)

    const { forwardRef, className, ...other } = props

    const navBarClassName = ClassNames(className, isSlideBarOpen && styles.slideOpen)

    const menuToggle = () => {
        setSlideBarOpen((prevState) => !prevState)
    }

    return (
        <div ref={forwardRef} className={navBarClassName} {...other}>
            <div className={styles.navContainer}>
                <NavContainer isSlideBarOpen={isSlideBarOpen} menuToggle={menuToggle}/>
            </div>
            <SlideContainer slide={isSlideBarOpen}/>
        </div>
        
        
    )

}