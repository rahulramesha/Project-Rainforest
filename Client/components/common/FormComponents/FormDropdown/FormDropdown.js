import React from 'react'
import ClassNames from 'classnames'

import styles from './FormDropdown.scss'

export const FormDropdown = props =>{


    const { name, value, setValue, dropdownList, className, ...others } = props

    const dropDownClassName = ClassNames(styles.dropDownContainer, className)

    const handleChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={dropDownClassName} >
            <label>{`${name} `}</label>
            <select  value={value}
                onChange={handleChange}
                {...others}>
                {dropdownList.map(item => <option key={item.id} value={item.value}>
                        {item.displayValue}
                    </option>)}
            </select>
        </div>
    )

}