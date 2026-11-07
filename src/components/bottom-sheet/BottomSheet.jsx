import { useEffect, useRef, useState } from 'react'
import './BottomSheet.css'

export default function BottomSheet({ isOpen, onClose }) {
        const sheetRef = useRef(null)
        const [ isDragging, setIsDragging ] = useState(false)
        const [ mounted, setmounted ] = useState(isOpen)
        const [ show, setShow ] = useState(false)

        const [ bgColor, setBgColor ] = useState('#ffc56c')
        const [ colorOne, setColorOne ] = useState('#fd5a46')
        const [ colorTwo, setColorTwo ] = useState('#ccff00')
        const [ colorThree, setColorThree ] = useState('#00bfff')

        // bg, primary, secondary, accent

        const initialPosition = useRef(20)
        const startY = useRef(0)
        const yDistance = useRef(0)

        const presetColors = [
                '#ffc56c',
                '#fd5a46',
                '#ccff00',
                '#00bfff',
                '#cb2fff',
                '#ffffff'
        ]

        const handlePointerDown = (event) => {
                startY.current = event.clientY
                // yDistance.current = 0

                setIsDragging(true)

                event.currentTarget.setPointerCapture(event.pointerId)
        }

        const handlePointerMove = (event) => {
                if (!isDragging) return

                yDistance.current = event.clientY - startY.current

                sheetRef.current.style.transform = `translateY(calc(${initialPosition.current}dvh + ${yDistance.current}px))` //clamp to the top of the screen so that it does not get drag past the celing
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

        useEffect(() => {
                const root = document.documentElement
                root.style.setProperty('--bg-color', bgColor)
                root.style.setProperty('--color-one', colorOne)
                root.style.setProperty('--color-two', colorTwo)
                root.style.setProperty('--color-three', colorThree)
        }, [bgColor, colorOne, colorTwo, colorThree])

        if (!mounted) return null

        return (
                <div className={`bottom-sheet ${show ? 'active' : ''}`} onClick={onClose}>
                        <section 
                                ref={sheetRef} 
                                className={`bottom-sheet__body ${ show ? 'show' : ''} ${isDragging ? 'dragging' : ''}`} 
                                onClick={event => event.stopPropagation()}
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp} // TODO prevent trigger of these when interacting with the content
                        >
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
                                <div 
                                        className="bottom-sheet__content"
                                        // onPointerDown={event => event.stopPropagation()}
                                        // onPointerMove={event => event.stopPropagation()}
                                        // onPointerUp={event => event.stopPropagation()}
                                >
                                        <h1 className='bottom-sheet__title'>Theme</h1>

                                        <section className="bg-color bottom-sheet__section">
                                                <p className="bottom-sheet__label">Background color</p>
                                                <div className="color-theme__options" style={{backgroundColor: bgColor}}>
                                                        {presetColors.map(color => (
                                                                <label 
                                                                        className={`color-theme__preset-color ${bgColor === color ? 'active' : ''}`}
                                                                        style={{backgroundColor: color}} 
                                                                        key={color}
                                                                        onPointerDown={event => event.stopPropagation()}
                                                                        onPointerMove={event => event.stopPropagation()}
                                                                        onPointerUp={event => event.stopPropagation()}
                                                                >
                                                                        <input 
                                                                                type="radio" 
                                                                                name="bg-color" 
                                                                                checked={bgColor === color}
                                                                                onChange={() => setBgColor(color)}
                                                                                hidden
                                                                        />
                                                                </label>
                                                        ))}
                                                </div>
                                        </section>

                                        <section className="color-1 bottom-sheet__section">
                                                <p className="bottom-sheet__label">Color 1</p>
                                                <div className="color-theme__options" style={{backgroundColor: colorOne}}>
                                                        {presetColors.map(color => (
                                                                <label 
                                                                className={`color-theme__preset-color ${colorOne === color ? 'active' : ''}`}
                                                                style={{backgroundColor: color}} 
                                                                key={color}
                                                                onPointerDown={event => event.stopPropagation()}
                                                                onPointerMove={event => event.stopPropagation()}
                                                                onPointerUp={event => event.stopPropagation()}
                                                        >
                                                                <input 
                                                                        type="radio" 
                                                                        name="color-one" 
                                                                        checked={colorOne === color}
                                                                        onChange={() => setColorOne(color)}
                                                                        hidden
                                                                />
                                                        </label>
                                                        ))}
                                                </div>
                                        </section>

                                        <section className="color-2 bottom-sheet__section">
                                                <p className="bottom-sheet__label">Color 2</p>
                                                <div className="color-theme__options" style={{backgroundColor: colorTwo}}>
                                                        {presetColors.map(color => (
                                                                <label 
                                                                className={`color-theme__preset-color ${colorTwo === color ? 'active' : ''}`}
                                                                style={{backgroundColor: color}} 
                                                                key={color}
                                                                onPointerDown={event => event.stopPropagation()}
                                                                onPointerMove={event => event.stopPropagation()}
                                                                onPointerUp={event => event.stopPropagation()}
                                                        >
                                                                <input 
                                                                        type="radio" 
                                                                        name="bg-color" 
                                                                        checked={colorTwo === color}
                                                                        onChange={() => setColorTwo(color)}
                                                                        hidden
                                                                />
                                                        </label>
                                                        ))}
                                                </div>
                                        </section>

                                        <section className="color-3 bottom-sheet__section">
                                                <p className="bottom-sheet__label">Color 3</p>
                                                <div className="color-theme__options" style={{backgroundColor: colorThree}}>
                                                        {presetColors.map(color => (
                                                                <label 
                                                                        className={`color-theme__preset-color ${colorThree === color ? 'active' : ''}`}
                                                                        style={{backgroundColor: color}} 
                                                                        key={color}
                                                                        onPointerDown={event => event.stopPropagation()}
                                                                        onPointerMove={event => event.stopPropagation()}
                                                                        onPointerUp={event => event.stopPropagation()}
                                                                >
                                                                        <input 
                                                                                type="radio" 
                                                                                name="bg-color" 
                                                                                checked={colorThree === color}
                                                                                onChange={() => setColorThree(color)}
                                                                                hidden
                                                                        />
                                                                </label>
                                                        ))}
                                                </div>
                                        </section>
                                </div>
                        </section>
                </div>
        )
}