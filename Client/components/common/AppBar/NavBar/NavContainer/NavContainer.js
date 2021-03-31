import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import { Brand } from '../../Brand'
import { NavList } from '../NavList'
import { HamBurgerMenu } from './HamBurgerMenu'
import { Cart } from './Cart'
import { SearchBar } from './SearchBar'
import { Account } from './Account'

import styles from './NavContainer.scss'

export const NavContainer =  props => {

    const { isSlideBarOpen, menuToggle } = props

    const navContainerRef = useRef(null)

    return (<nav className={styles.navs} ref={navContainerRef}>
        <ol >
            <li className={styles.hamBurgerMenuContainer}>
                <HamBurgerMenu isOpen={isSlideBarOpen} onToggle={menuToggle}/>
            </li>
            <li className={styles.brandContainer}>
                <Link to='/ssr/home'>
                    <Brand />
                </Link>
            </li>
            <NavList className={styles.navLink} />
            <li className={styles.linkCart}>
                <Link to='/spa/cart'>
                    <Cart />
                </Link>
            </li>
            <SearchBar popupContainerRef={navContainerRef} suggetionStyles={styles.popup}/>
            <Account navContainerRef={navContainerRef}  />
        </ol>
    </nav>
    )

}