import { useEffect, useRef, useState } from 'react'
import './BottomSheet.css'

export default function BottomSheet({ isOpen, onClose }) {
        const sheetRef = useRef(null)
        const [ isDragging, setIsDragging ] = useState(false)
        const [ mounted, setmounted ] = useState(isOpen)
        const [ show, setShow ] = useState(false)

        const initialPosition = useRef(20)
        const startY = useRef(0)
        const yDistance = useRef(0)

        const handlePointerDown = (event) => {
                startY.current = event.clientY
                // yDistance.current = 0

                setIsDragging(true)

                event.currentTarget.setPointerCapture(event.pointerId)
        }

        const handlePointerMove = (event) => {
                if (!isDragging) return

                yDistance.current = event.clientY - startY.current

                sheetRef.current.style.transform = `translateY(calc(${initialPosition.current}dvh + ${yDistance.current}px))`
        }

        const handlePointerUp = () => {
                if (!isDragging) return

                setIsDragging(false)

                if (yDistance.current > 150) {
                        sheetRef.current.style.transform = ''
                        initialPosition.current = 20
                        onClose()
                }
                else if (yDistance.current < -50) {
                        sheetRef.current.style.transform = 'translate(0)'
                        initialPosition.current = 0
                }
                else {
                        sheetRef.current.style.transform = ''
                        initialPosition.current = 20
                }

                yDistance.current = 0
        }

        useEffect(() => {
                if (!isOpen) {
                        setShow(false)

                        let timeout = setTimeout(() => {
                                setmounted(false)
                        }, 300)

                        return () => clearTimeout(timeout)
                }

                setmounted(true)
                // setShow(true)
                        
                setTimeout(() => {
                        setShow(true)
                }, 0) // TODO study how these worked
        }, [isOpen])

        if (!mounted) return null

        return (
                <div className={`bottom-sheet ${show ? 'active' : ''}`} onClick={onClose}>
                        <section ref={sheetRef} className={`bottom-sheet__body ${ show ? 'show' : ''} ${isDragging ? 'dragging' : ''}`} onClick={event => event.stopPropagation()}>
                                <div className="bottom-sheet__top-shelf">
                                        <div 
                                                className="bottom-sheet__drag-line"
                                                onPointerDown={handlePointerDown}
                                                onPointerMove={handlePointerMove}
                                                onPointerUp={handlePointerUp}
                                                onPointerCancel={handlePointerUp}
                                        >
                                        </div>
                                        {/* <button className="bottom-sheet__close-button">
                                                <span className='material-symbols-outlined'>close</span>
                                        </button> */}
                                </div>
                                <div className="bottom-sheet__content">
                                        <h1>Theme</h1>
                                        <p>lorem ipsum dolor sit amet consectetur adipiscing elit dolore consectetur eiusmod eligendi facilis occaecat non qui voluptas dolor ipsum imperdiet irure esse adipiscing id deserunt cum et ut expedita iusto dolore voluptate id est nobis at libero in irure voluptatum cumque nam ad libero ut qui culpa dolores amet eos sit lorem veniam non id sint duis consectetur in commodo officia dolor quas labore dolores ut est mollit commodo cillum quod ipsum ducimus praesentium dolore velit consequatur quos similique nulla occaecat dolore esse maxime dolorum nihil ad atque excepturi nulla amet id corrupti accusamus odio nostrud temporibus dolor consequatur rerum qui odio officia culpa occaecat do id expedita elit nostrud qui cupiditate voluptas aliquip consequatur tempor facere iusto dolorem reprehenderit</p>
                                </div>
                        </section>
                </div>
        )
}