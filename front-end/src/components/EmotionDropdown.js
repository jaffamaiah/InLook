import React, { useState } from 'react'

import { emotions } from '../Constants'

function EmotionDropdown({ onOptionSelect }) {
    const [selectedOption, setSelectedOption] = useState('')

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value)
        onOptionSelect(event.target.value) // Notify parent
    }

    return <div>
        <select value={selectedOption} onChange={handleOptionSelect} style={{
            width: '150px'
        }}>
            {!selectedOption &&
                <option value=''>Tag an Emotion</option>
            }
            {
                Object.entries(emotions).map(([emotionName, emotionProperties]) => (
                    <option key={emotionName} value={emotionName} >
                        {emotionProperties.name}
                    </option>
                ))
            }
        </select>

        {!!selectedOption &&
            <span style={{
                display: 'inline-block',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                marginRight: '5px',
                backgroundColor: emotions[selectedOption].color
            }} />
        }
    </div>
}

export default EmotionDropdown
