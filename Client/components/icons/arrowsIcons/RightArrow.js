import React from 'react'

export const RightArrow = props => {
    return (
        <div className={props.className}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                preserveAspectRatio="xMidYMid meet" style={{height: 'inherit', width: '100%'}}>
                <g>
                    <path d="M19.414 27.414l10-10c0.781-0.781 
                        0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 
                        0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 
                        6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 
                        2.047 0.781 2.828 0z"/>
                </g>
            </svg>
        </div>
    )
}