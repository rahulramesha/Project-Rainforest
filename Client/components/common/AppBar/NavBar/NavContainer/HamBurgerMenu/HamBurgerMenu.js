import React from 'react'
import classNames from 'classnames'

import styles from './HamBurgerMenu.scss'

export const HamBurgerMenu = props => {

    const containerClassName = classNames(styles.hamburgerContainer, props.className && props.className);
    const hamburgerClassName = classNames(styles.hamburger, props.isOpen && styles.close);

    return (
        <button className={containerClassName} onClick={props.onToggle} aria-label='opens side panel menu'>
            <span className={hamburgerClassName} />
            <span className={hamburgerClassName} />
            <span className={hamburgerClassName} />
        </button>
    )

}