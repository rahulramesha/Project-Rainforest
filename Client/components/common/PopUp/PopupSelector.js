import React from 'react'

export const PopupSelector = props => {
    const {children, forwardRef, ...others} = props
    return React.cloneElement(children, {
        ref: forwardRef,
        ...others
    })
}