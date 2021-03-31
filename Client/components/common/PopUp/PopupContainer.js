import React from 'react'

export const PopupContainer = props => {
    const {children, ...others} = props
    return React.cloneElement(children, { ...others })
}