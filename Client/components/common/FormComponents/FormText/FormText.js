import React from 'react'
import ClassNames from 'classnames'

import { getString } from '../../../common/strings'

import styles from './FormText.scss'

export const FormText = props => {

    const { name, id, value, setValue, placeholder, className, error, type, ...others } = props

    const textFieldClassName = ClassNames(styles.textFieldContainer, className)
    const labelClassName = ClassNames(styles.inputLabel, value.length && styles.labelAppear)

    const handleChange = e => {
        setValue(e.target.value)
    }

    const inputType = type ? type : 'text'

    return (
        <div className={textFieldClassName} >
            <input className={styles.inputField}
                type={inputType} 
                name={name}
                id={id} 
                value={value} 
                onChange={handleChange} 
                placeholder={placeholder}
                {...others}/>
            <label htmlFor={props.id} className={labelClassName}>
                {props.placeholder}
            </label>
            { error && error.validationErrors && error.validationErrors[name] && 
                error.validationErrors[name].map((val,i) => <p key={i} className={styles.errorMessages}>{getString(val)}</p>)}
        </div>
    )
}