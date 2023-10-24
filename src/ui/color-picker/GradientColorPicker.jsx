import React from 'react'
import ColorPicker from 'react-best-gradient-color-picker';

export function GradientColorPicker(props) {
    const {value, onChange, ...rest} = props;
    const [color, setColor] = React.useState(value);
    return <ColorPicker value={color}
                        height={150}
                        {...rest}
                        hideAdvancedSliders={true}
                        hideColorGuide={true}
                        hideInputType={true}
                        onChange={(color) => {
                            setColor(color);
                            onChange(color);
                        }}
    />
}