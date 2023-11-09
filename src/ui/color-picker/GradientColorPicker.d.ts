export interface GradientColorPickerProps {
    value?: string;
    onChange?: (colors: string) => void;
    hideControls?: boolean;
}

export function GradientColorPicker(props: GradientColorPickerProps): JSX.Element;
