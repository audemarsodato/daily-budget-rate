// import '../BottomSheet.css'

import { useEffect, useState } from "react"

export default function ColorThemeOptions({ colorType, setColor, presetColors }) {
        const [ customColor, setCustomColor ] = useState('')

        useEffect(() => {
                if (!presetColors.includes(colorType)) {
                        // console.log('CURRENT COLOR IS NOT IN PRESET, SO IT MUST BE A CUSTOM COLOR')
                        setCustomColor(colorType)
                }
        }, [])

        useEffect(() => {
                if (!customColor) return // IF there is no custom color, then dont set the custom color as the color
                setColor(customColor)
        }, [customColor])
       
        return (
                <div className="color-theme__options" style={{backgroundColor: colorType}}>
                        {presetColors.map(color => (
                                <label 
                                        className={`color-theme__preset-color ${colorType === color ? 'active' : ''}`}
                                        style={{backgroundColor: color}} 
                                        key={color}
                                        onPointerDown={event => event.stopPropagation()}
                                        onPointerMove={event => event.stopPropagation()}
                                        onPointerUp={event => event.stopPropagation()}
                                >
                                        <input 
                                                type="radio" 
                                                name="bg-color" 
                                                checked={colorType === color}
                                                onChange={() => setColor(color)}
                                                hidden
                                        />
                                </label>
                        ))}
                        <label 
                                className={`color-theme__custom-color ${colorType === customColor ? 'active' : ''}`}
                                onPointerDown={event => event.stopPropagation()}
                                onPointerMove={event => event.stopPropagation()}
                                onPointerUp={event => event.stopPropagation()}
                        >
                                <span className='material-symbols-outlined color-theme__custome-color__icon'>colors</span>
                                <input type="color" onChange={event => setCustomColor(event.target.value)} hidden/>
                        </label>
                </div>
        )
}