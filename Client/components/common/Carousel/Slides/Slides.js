import React, { forwardRef, useEffect, useState, useRef, useCallback, useImperativeHandle } from 'react'

import styles from './Slides.scss'

export const Slides = forwardRef((props, ref) => {

    const [xTranslate, setXTranslate] = useState(0)
    const [slideWidth, setSlideWidth] = useState(0)
    const [clonedChildren, setClonedChildren] = useState(null)
    const [slidingState, setSlidingState] = useState({
                                                isDragging: false,
                                                initialX: 0,
                                                moveX: 0
                                            })

    const carouselRef = useRef(null)

    const resizeSlideWidth = useCallback(() => {
        if(carouselRef && carouselRef.current){
            setSlideWidth(carouselRef.current.clientWidth)
            setXTranslate( (currentSlide + 1) * slideWidth* -1 )
        }
    }, [])

    const { currentSlide, setCurrentSlide } = props

    const numOfChildren = props.children.length

    const updateSlide = num => {
        setCurrentSlide(prevState => {
            let slideNumber = prevState + num

            if(slideNumber < 0) {
                slideNumber = numOfChildren - 1
            } else if (slideNumber > numOfChildren - 1) {
                slideNumber = 0
            }
            

            setXTranslate( (slideNumber + 1) * slideWidth * -1 )
            return slideNumber

        })
    }

    const nextSlide = () => updateSlide(1);

    const prevSlide = () => updateSlide(-1);

    useImperativeHandle(ref, () => ({
        setSlide: slideNumber => {
            updateSlide(slideNumber-currentSlide)
        },
        next: nextSlide,
        prev: prevSlide
    }))

    const onDown = e => {
  
        const xPos = e.type === 'touchstart' ? e.touches[0].clientX: e.pageX

        setSlidingState({
                isDragging: true,
                initialX: xPos,
                moveX: xPos
            })

    }

    const onMove = e => {

        if(slidingState.isDragging) {
            const xPos = e.type === 'touchmove' ? e.touches[0].clientX: e.pageX
            const offset = slidingState.moveX - xPos

            setSlidingState(prevState => {
            
                return {
                    isDragging: prevState.isDragging,
                    initialX: prevState.initialX,
                    moveX: xPos
                }
            })
            setXTranslate(prevState => (prevState - offset))
        }
    }

    const onUp = e => {

        if(slidingState.isDragging) {

            const delta = slidingState.initialX - slidingState.moveX;

            setSlidingState({
                    isDragging: false,
                    initialX: 0,
                    moveX: 0
                })

            if(delta < -100) {
                prevSlide()
            } else if(delta > 100) {
                nextSlide()
            } else {
                updateSlide(0)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('resize', resizeSlideWidth)

        const childrenProps = [props.children[numOfChildren - 1], ...props.children, props.children[0]]

        const children = childrenProps.map( (child, i) => {
            const id = i === 0? 'dummy_first': i === childrenProps.length - 1? 'dummy_last': i
            
            return React.cloneElement(child, {key: id, className: styles.slideElement, draggable: false})
        })

        setClonedChildren(children)
        setTimeout(resizeSlideWidth, 0)

        return () => {
            window.removeEventListener('resize', resizeSlideWidth)
        }

    }, [])

    useEffect(() => {

        if ('ontouchstart' in window || window.DocumentTouch) {
            
            carouselRef.current.ontouchstart = onDown
            carouselRef.current.ontouchmove = onMove
            carouselRef.current.ontouchcancel = onUp
            carouselRef.current.ontouchend = onUp

        } else if (typeof PointerEvent !== 'undefined') {

            carouselRef.current.onpointerdown = onDown
            carouselRef.current.onpointermove = onMove
            carouselRef.current.onpointerup = onUp
            carouselRef.current.onpointerleave = onUp

        } else {

            carouselRef.current.onmousedown = onDown
            carouselRef.current.onmousemove = onMove
            carouselRef.current.onmouseup = onUp
            carouselRef.current.onmouseleave = onUp
        }

    }, [slidingState])

    return (
        <div ref={carouselRef}
            className={styles.slidesContainer}>
            <div className={styles.slidesList}
                style={{ transform: `translateX(${xTranslate}px)` }}>
                {clonedChildren}
            </div>
        </div>
    )
})