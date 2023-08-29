import React, {Component} from 'react';
import './GroupColorPicker.less';
import ColorPicker from "./BaseColorPicker";


interface GroupColorPickerProp {
    onChange?: (data: string[]) => void;
    value?: string[];
    canAdd?: boolean;
    containerStyle?: React.CSSProperties;
}

/**
 * 组合颜色选择器，可以同时渲染多个颜色选择器。色值结果以数组返回
 */
class GroupColorPicker extends Component<GroupColorPickerProp> {

    max: number = 5;

    state: any = {
        colors: []
    }

    constructor(props: GroupColorPickerProp) {
        super(props);
        const {value = [], canAdd} = props;
        if (value.length === 0) {
            this.state = {colors: ['#00e9ff']};
            return;
        }
        this.state = {colors: [...value], canAdd};
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
        const {containerStyle} = this.props;
        const _style: React.CSSProperties = {
            display: "flex",
            flexDirection: "row",
            ...containerStyle
        }
        return (
            <div className={'group-color-picker'} style={{..._style}}>
                {colors.map((item: string, i: number) => {
                    return (
                        <div className={"group-color-item"} key={i + ''}>
                            <ColorPicker value={item}
                                         onChange={(color: string) => this.onChange(color, i)}/>
                            <span onClick={() => this.delColor(i)}><label>×</label></span>
                        </div>
                    )
                })}
                {canAdd &&
                <div onClick={this.addColor} className={'color-pick-add-btn'}><span>+</span></div>}
            </div>
        )
    }
}

export default GroupColorPicker;