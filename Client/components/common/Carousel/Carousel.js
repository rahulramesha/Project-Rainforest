import React, {useState, useRef} from 'react'

import { Slides } from './Slides'
import { PreviewList } from './PreviewList'
import { LeftArrow, RightArrow } from '../../icons/arrowsIcons'

import styles from './Carousel.scss'

export const Carousel = props => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const slidesRef = useRef()

    const prev = () => slidesRef.current.prev()
    const next = () => slidesRef.current.next()

    const handlePreviewClick = index => {
        slidesRef.current.setSlide(index)
    }

    return ( 
    <div className={styles.carouselContainer}>
        <PreviewList selected={currentSlide} onListClick={handlePreviewClick}>
            {props.children}
        </PreviewList>
        <button onClick={prev} className={styles.arrows} aria-label='moves to previous image'>
            <LeftArrow className={styles.arrowIcon}/>
        </button>
        <Slides ref={slidesRef} 
            className={styles.slidesContainer}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}>
            {props.children}
        </Slides>
        <button onClick={next} className={styles.arrows} aria-label='moves to next image'>
            <RightArrow className={styles.arrowIcon}/>
        </button>
    </div>
    )

}