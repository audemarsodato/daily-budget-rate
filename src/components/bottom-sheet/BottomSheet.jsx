import { useEffect, useRef, useState } from 'react'
import './BottomSheet.css'
import ColorThemeOptions from './components/ColorThemeOptions'

export default function BottomSheet({ isOpen, onClose }) {
        const sheetRef = useRef(null)
        const [ isDragging, setIsDragging ] = useState(false)
        const [ mounted, setmounted ] = useState(isOpen)
        const [ show, setShow ] = useState(false)

        const [ bgColor, setBgColor ] = useState('#ffc56c')
        const [ accentColor, setAccentColor ] = useState('#fd5a46') 
        const [ secondaryColor, setSecondaryColor ] = useState('#ccff00') 
        const [ primaryColor, setPrimaryColor ] = useState('#00bfff') 

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

                sheetRef.current.style.transform = `translateY(${Math.max(0, initialPosition.current * window.innerHeight / 100 + yDistance.current)}px)` //clamp to the top of the screen so that it does not get drag past the celing
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

                requestAnimationFrame(() => { // TODO study the system behind these two raf used
                        requestAnimationFrame(() => {
                                setShow(true)
                        })
                })
                        
                // setTimeout(() => {
                // }, 0) // TODO study how these worked
        }, [isOpen])

        useEffect(() => {
                const root = document.documentElement
                root.style.setProperty('--bg-color', bgColor)
                root.style.setProperty('--accent-color', accentColor)
                root.style.setProperty('--secondary-color', secondaryColor)
                root.style.setProperty('--primary-color', primaryColor)
        }, [bgColor, accentColor, secondaryColor, primaryColor])

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
                                onPointerCancel={handlePointerUp} 
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
                                <div className="bottom-sheet__content">
                                        <h1 className='bottom-sheet__title'>Theme</h1>

                                        <section className="bg-color bottom-sheet__section">
                                                <p className="bottom-sheet__label">Background color</p>
                                                <ColorThemeOptions colorType={bgColor} setColor={setBgColor} presetColors={presetColors} />
                                        </section>

                                        <section className="color-1 bottom-sheet__section">
                                                <p className="bottom-sheet__label">Accent color</p>
                                                <ColorThemeOptions colorType={accentColor} setColor={setAccentColor} presetColors={presetColors} />
                                        </section>

                                        <section className="color-2 bottom-sheet__section">
                                                <p className="bottom-sheet__label">Secondary color</p>
                                                <ColorThemeOptions colorType={secondaryColor} setColor={setSecondaryColor} presetColors={presetColors} />
                                        </section>

                                        <section className="color-3 bottom-sheet__section">
                                                <p className="bottom-sheet__label">Primary color</p>
                                                <ColorThemeOptions colorType={primaryColor} setColor={setPrimaryColor} presetColors={presetColors} />
                                        </section>
                                </div>
                        </section>
                </div>
        )
}