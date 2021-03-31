import React from 'react'
import { Link } from 'react-router-dom'

export const NavList = props => {
    return (
        <React.Fragment>
            <li className={props.className}>
                <Link  to='/ssr/shop'>
                    shop
                </Link>
            </li>
            <li className={props.className}>
                <Link to='/ssr/auth'>
                    About
                </Link>
            </li>
        </React.Fragment>
    )
}