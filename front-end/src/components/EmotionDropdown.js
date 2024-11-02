import React, { useState } from 'react';

import { emotions } from "../Constants"

function EmotionDropdown({ onOptionSelect }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value)
        onOptionSelect(event.target.value) // Notify parent
    }

    return (
        <select value={selectedOption} onChange={handleOptionSelect}>{
            Object.entries(emotions).map(([emotionName]) => (
                <option key={emotionName}>
                    {emotionName}
                </option>
            ))
        }</select>
    )
}

export default EmotionDropdown;
