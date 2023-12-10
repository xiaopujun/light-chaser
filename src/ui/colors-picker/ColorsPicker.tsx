import {Component} from 'react';
import './ColorsPicker.less';
import ColorPicker from "../color-picker/ColorPicker";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface ColorsPickerProp extends UIContainerProps {
    value?: string[];
    defaultValue?: string[];
    canAdd?: boolean;
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
            this.state = {colors: ['#a9a9a9']};
            return;
        }
        this.state = {colors: [...value], canAdd: canAdd && value.length < this.max};
    }


    onChange = (color: string, id: number) => {
        const {colors} = this.state;
        colors[id] = color;
        this.setState({colors})
        const {onChange} = this.props;
        onChange && onChange([...colors]);
    }

    addColor = () => {
        const {colors} = this.state;
        if (colors.length >= this.max)
            return;
        colors.push('#a9a9a9');
        if (colors.length === this.max)
            this.setState({canAdd: false, colors});
        else
            this.setState({colors});
        const {onChange} = this.props;
        onChange && onChange([...colors]);
    }

    delColor = (id: number) => {
        const {colors} = this.state;
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
        const {label, tip} = this.props;
        return (
            <UIContainer tip={tip} label={label}>
                <div className={'colors-picker'}>
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