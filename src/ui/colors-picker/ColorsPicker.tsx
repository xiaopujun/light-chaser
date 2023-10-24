import React, {Component} from 'react';
import './ColorsPicker.less';
import ColorPicker from "../color-picker/ColorPicker";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface ColorsPickerProp extends UIContainerProps {
    value?: string[];
    defaultValue?: string[];
    canAdd?: boolean;
    containerStyle?: React.CSSProperties;
    onChange?: (data: string[]) => void;
}

/**
 * 组合颜色选择器，可以同时渲染多个颜色选择器。色值结果以数组返回
 */
class ColorsPicker extends Component<ColorsPickerProp> {

    max: number = 5;

    state: any = {
        colors: []
    }

    constructor(props: ColorsPickerProp) {
        super(props);
        const {value = [], canAdd} = props;
        if (value.length === 0) {
            this.state = {colors: ['#00e9ff']};
            return;
        }
        this.state = {colors: [...value], canAdd: canAdd && value.length < this.max};
    }


    onChange = (color: string, id: number) => {
        let {colors} = this.state;
        colors[id] = color;
        this.setState({colors})
        const {onChange} = this.props;
        onChange && onChange([...colors]);
    }

    addColor = () => {
        let {colors} = this.state;
        if (colors.length >= this.max)
            return;
        colors.push('#00e9ff');
        if (colors.length === this.max)
            this.setState({canAdd: false, colors});
        else
            this.setState({colors});
        const {onChange} = this.props;
        onChange && onChange([...colors]);
    }

    delColor = (id: number) => {
        let {colors} = this.state;
        colors.splice(id, 1);
        if (colors.length < this.max)
            this.setState({canAdd: true, colors});
        else
            this.setState({colors});
        const {onChange} = this.props;
        onChange && onChange([...colors]);
    }

    render() {
        const {colors = [], canAdd = false} = this.state;
        const {containerStyle, label, tip} = this.props;
        const _style: React.CSSProperties = {
            display: "flex",
            flexDirection: "row",
            ...containerStyle
        }
        return (
            <UIContainer tip={tip} label={label}>
                <div className={'colors-picker'} style={{..._style}}>
                    {colors.map((item: string, i: number) => {
                        return (
                            <div className={"colors-item"} key={i + ''}>
                                <ColorPicker value={item}
                                             hideControls={true}
                                             onChange={(color: string) => this.onChange(color, i)}/>
                                <span onClick={() => this.delColor(i)}><label>×</label></span>
                            </div>
                        )
                    })}
                    {canAdd &&
                    <div onClick={this.addColor} className={'colors-pick-add-btn'}><span>+</span></div>}
                </div>
            </UIContainer>
        )
    }
}

export default ColorsPicker;