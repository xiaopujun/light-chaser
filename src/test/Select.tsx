import React, {useEffect, useState} from "react";
import "./Select.less";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    options: Option[];
    dropdownStyle?: React.CSSProperties;
    placeholder?: string;
}

const Select: React.FC<SelectProps> = ({options, dropdownStyle, placeholder = "请选择"}) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const toggleDropdown = (): void => setDropdownOpen(!dropdownOpen);
    const handleOptionClick = (option: Option): void => {
        setSelectedOption(option);
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (e.target) {
                const target = e.target as HTMLElement;
                const isClickInside = target.classList.contains('lc-select-inside');
                if (!isClickInside)
                    setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);
    return (
        <div className="lc-select-container">
            <div className="lc-select-header lc-select-inside" style={dropdownStyle} onClick={toggleDropdown}>
                {selectedOption ? (
                    <div className={'lc-select-inside'}>{selectedOption.label}</div>
                ) : (
                    <div className="placeholder lc-select-inside">
                        {placeholder}
                    </div>
                )}
            </div>
            {dropdownOpen && (
                <ul className="lc-select-options" style={dropdownStyle}>
                    {options.map((option: Option, index: number) => (
                        <li className={'lc-select-option lc-select-inside'} key={index}
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