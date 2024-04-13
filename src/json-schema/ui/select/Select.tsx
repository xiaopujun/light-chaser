import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import "./Select.less";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface ISelectOption {
    label: string;
    value: string;
}

interface SelectProps extends UIContainerProps {
    // 选中的值（受控）
    value?: string;
    // 默认选中的值（非受控）
    defaultValue?: string;
    // 选项列表（非受控）
    options: ISelectOption[];
    disabled?: boolean;
    // 占位符（非受控）
    placeholder?: string;
    // 选中值改变时的回调
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = (props) => {
    const {value, defaultValue, options, disabled = false, placeholder = "请选择", onChange, ...containerProps} = props;
    const dom: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const controlled: boolean = value !== undefined && defaultValue === undefined
    const _options = options || [];
    const getTargetOption = (value: string = ''): ISelectOption | null => {
        for (let i = 0; i < _options.length; i++) {
            const option = _options[i];
            if (option.value === value)
                return option;
        }
        return null;
    }
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(getTargetOption(value || defaultValue));
    const toggleDropdown = (): void => setDropdownOpen(!dropdownOpen);
    const handleOptionClick = (option: ISelectOption): void => {
        if (!controlled)
            setSelectedOption(option);
        onChange && onChange(option.value || '');
        setDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dom.current && !dom.current.contains(event.target as HTMLElement)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const showContent = controlled ? getTargetOption(value)?.label || placeholder : selectedOption?.label || placeholder;

    return (
        <UIContainer {...containerProps}>
            <div className="lc-select" ref={dom}>
                <div className={`lc-select-header`} style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}}
                     onClick={disabled ? undefined : toggleDropdown}>
                    {showContent}
                </div>
                <div style={{position: 'relative'}}>
                    {dropdownOpen && (
                        <ul className={"lc-select-options"} style={{width: dom?.current?.offsetWidth || 90}}>
                            {options.map((option: ISelectOption, index: number) => (
                                <li className={`lc-select-option`} key={index + ''}
                                    onClick={() => handleOptionClick(option)}>
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </UIContainer>
    );
};
export default Select;