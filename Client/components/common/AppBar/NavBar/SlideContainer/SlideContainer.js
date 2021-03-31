import React from 'react'
import classNames from 'classnames'

import { NavList } from '../NavList'

import styles from './SlideContainer.scss'

export const SlideContainer = props => {

    const slideClassName = classNames(styles.slideContainer, props.slide && styles.slide)

    return (
        <nav className={slideClassName} aria-hidden={!props.slide}>
            <ol>
                <NavList />
            </ol>
        </nav>
    )
}