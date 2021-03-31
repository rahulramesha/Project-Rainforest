import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'


// while using with targetContainerRef, set position as Relative on the targetContainer
export const PopupController = (props) => {

    const { children } = props
    const selectorRef = useRef(null)
    const popupRef = useRef(null)
    const [isOpen, setOpen] = useState(false)
    const [styles, setStyles] = useState({
        position: 'absolute',
        top: 0,
        left: 0
    })

    const setPosition = useCallback(() => {
        const selectorPosition = selectorRef.current.getBoundingClientRect()
        const popupPosition = popupRef.current.getBoundingClientRect()
        const windowWidth = window.innerWidth

        let left = selectorPosition.left + selectorPosition.width / 2 - popupPosition.width / 2
        left = ( left + popupPosition.width ) > windowWidth ? 
                windowWidth - popupPosition.width:
                left
        const top = selectorPosition.bottom -  (props.targetContainer ? 
                                                    props.targetContainer.current.getBoundingClientRect().top:
                                                    0
                                                )

        const calculatedStyles = { 
                            position: 'absolute',
                            left,
                            top
                        }

        if(props.width)
            calculatedStyles.width = selectorPosition.width

        setStyles(calculatedStyles)
        
    }, [])

    const close = useCallback(() => setOpen(false), [])

    const togglePopup = () => {
        setOpen((prevState) => {
            if(props.persistAfterClick && prevState)
                return prevState
            
            return !prevState
        })
    }

    useEffect(() => {
        
        if(isOpen)
            setPosition()

        setTimeout(() => {
            if(isOpen) {
                window.addEventListener('resize', setPosition)
                window.addEventListener('click', close)
            } else {
                window.removeEventListener('resize', setPosition)
                window.removeEventListener('click', close)
            }
        }, 0)

    }, [isOpen])

    const inputChildren = React.Children.map(children, child => {
        if(child.type.displayName === 'PopupSelector') {

            return React.cloneElement(child, { 
                onClick: togglePopup,
                open: isOpen, 
                forwardRef: selectorRef })

        } else if(child.type.displayName === 'PopupContainer') {

            return isOpen && ReactDOM.createPortal(
                <span ref={popupRef} style={styles} onClick={e => e.stopPropagation()}>
                    {React.cloneElement(child)}
                </span>,
                props.targetContainer ? props.targetContainer.current : document.body
            )
        }
    })

    return inputChildren;
}
