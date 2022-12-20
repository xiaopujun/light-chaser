import React, {Component} from 'react';
import ColorPicker from "../../../base/BaseColorPicker";
import LCNumberInput from "../../../base/LCNumberInput";

export default class FourAngleGlowBorderSet extends Component<any> {

    state: any = {
        fourAngleGlowDefaultConfig: {
            fourAngleGlowColor: '#00fbff'
        }
    }

    componentDidMount() {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({
            fourAngleGlowColor: '#00fbff',
            fourAngleGlowWidth: '1px',
            fourAngleGlowLength: '15px'
        });
    }

    fourAngleGlowColorChanged = (color: string | string[]) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({fourAngleGlowColor: color});
    }

    fourAngleGlowWidthChanged = (width: number) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({fourAngleGlowWidth: width + 'px'});
    }

    fourAngleGlowLengthChanged = (length: number) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({fourAngleGlowLength: length + 'px'});
    }

    render() {
        return (
            <>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>四角辉光颜色：</label>
                    <ColorPicker
                        onChange={this.fourAngleGlowColorChanged}
                        className={'lc-config-item-value'}/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>四角辉光宽度：</label>
                    <div className={'lc-config-item-value'}>
                        <div className={'lc-input-container'}>
                            <LCNumberInput id={'fourAngleGlowWidth'} onChange={this.fourAngleGlowWidthChanged}/>
                            <span>&nbsp;px</span>
                        </div>
                    </div>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>四角辉光长度：</label>
                    <div className={'lc-config-item-value'}>
                        <div className={'lc-input-container'}>
                            <LCNumberInput id={'fourAngleGlowWidth'} onChange={this.fourAngleGlowLengthChanged}/>
                            <span>&nbsp;px</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}