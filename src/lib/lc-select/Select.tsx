import React, {useEffect, useRef, useState} from "react";
import "./Select.less";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    // 选项列表（非受控）
    options: Option[];
    // 占位符（非受控）
    placeholder?: string;
    // 选中的值（受控）
    value?: string;
    // 默认选中的值（非受控）
    defaultValue?: string;
    // 选中值改变时的回调
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
                                           options,
                                           placeholder = "请选择",
                                           value, defaultValue,
                                           onChange
                                       }) => {
    const dom: any = useRef(null);
    const valueControl: boolean = value !== undefined;
    const _options = options || [];
    const getTargetOption = (value: string = ''): Option | null => {
        for (let i = 0; i < _options.length; i++) {
            const option = _options[i];
            if (option.value === value)
                return option;
        }
        return null;
    }
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(getTargetOption(value || defaultValue));
    const toggleDropdown = (): void => setDropdownOpen(!dropdownOpen);
    const handleOptionClick = (option: Option): void => {
        if (!valueControl) {
            setSelectedOption(option);
        }
        onChange && onChange(option.value || '');
        setDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        console.log("handleClickOutside")
        if (dom.current && !dom.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const showContent = valueControl ? getTargetOption(value)?.label || placeholder : selectedOption?.label || placeholder;

    return (
        <div className="lc-select-container" ref={dom}>
            <div className={`lc-select-header`} onClick={toggleDropdown}>
                {showContent}
            </div>
            {dropdownOpen && (
                <ul className={"lc-select-options"} style={{width: dom?.current.offsetWidth || 90}}>
                    {options.map((option: Option, index: number) => (
                        <li className={`lc-select-option`} key={index + ''}
                            onClick={() => handleOptionClick(option)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Select;