import React,{ useState } from 'react'
import ClassNames from 'classnames'

import { SearchIcon } from '../../../../../icons'

import styles from './SearchBar.scss'

export const SearchBar =  () => {
    const [searchToggle, setSearchToggle] = useState(false)
    const [value, setValue] = useState('')

    const searchBarListContainerClassName = ClassNames(styles.searchBarListContainer, searchToggle && styles.searchBarListContainerMobile)
    const searchBarClassName = ClassNames(styles.searchBar, !searchToggle && styles.searchBarOnMobile)
    const searchButtonClassName = ClassNames(styles.searchIconButtonMobile, searchToggle && styles.searchButtonOnMobile)

    const toggleSearchBar = () => {
        setSearchToggle((prevState)=> !prevState)
    }

    return (
        <li className={searchBarListContainerClassName}>
            <div className={searchBarClassName}>
                <input type='text' 
                        className={styles.searchText} 
                        value={value} 
                        onChange={e => setValue(e.target.value)}
                        id='itemSearchBar'
                />
                <label htmlFor='itemSearchBar' style={{display: 'none'}}>
                    Search bar for Items
                </label>
                {value !== '' &&<div className={styles.searchSuggetions}>
                    <p>Suggetions coming soon...</p>
                </div> }
                <button className={styles.searchIconButton} aria-label='search items'>
                    <SearchIcon className={styles.searchIcon}/>
                </button>
                <button className={styles.searchCloseButton} onClick={toggleSearchBar} aria-label='click to close search bar'>
                    <span />
                    <span />
                </button>
            </div>
            <button className={searchButtonClassName} onClick={toggleSearchBar} aria-label='click to open search bar'>
                <SearchIcon className={styles.searchIconMobile}/>
            </button>
        </li>
        
    )

}





