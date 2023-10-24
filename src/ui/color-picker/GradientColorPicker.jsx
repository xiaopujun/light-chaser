import React, {useState} from 'react'
import ColorPicker from 'react-best-gradient-color-picker'

export function GradientColorPicker() {
    const [color, setColor] = useState('rgba(255,255,255,1)');
    return <ColorPicker value={color}
                        hideInputs={true}
                        hideControls={false}
                        hidePresets={false}
                        hideEyeDrop={true}
                        hideAdvancedSliders={true}
                        hideColorGuide={false}
                        hideInputTypes={false}
                        onChange={(value) => {
                            setColor(value);
                        }}
    />
}