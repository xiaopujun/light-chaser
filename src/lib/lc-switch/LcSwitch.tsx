import React, {CSSProperties, useEffect, useState} from "react";
import "./LcSwitch.less";

interface LcSwitchProps {
    onChange?: (data: boolean) => void;
    containerStyle?: CSSProperties;
    value?: boolean;
}

const LcSwitch: React.FC<LcSwitchProps> = ({
                                               onChange,
                                               containerStyle = {top: 2.5},
                                               value: valueProp,
                                           }) => {
    const [checked, setChecked] = useState<boolean>(valueProp || false);
    const [prevPropsValue, setPrevPropsValue] = useState<boolean>();

    useEffect(() => {
        if (valueProp !== undefined && valueProp !== prevPropsValue) {
            setChecked(valueProp);
            setPrevPropsValue(valueProp);
        }
    }, [valueProp, prevPropsValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        setChecked(checked);
        onChange && onChange(checked);
    };
    console.log('LcSwitch render')
    return (
        <div className="lc-switch" style={{...containerStyle}}>
            <label className="lc-switch-label">
                <input checked={checked} onChange={handleChange} type="checkbox"/>
                <span/>
            </label>
        </div>
    );
};
export default LcSwitch;