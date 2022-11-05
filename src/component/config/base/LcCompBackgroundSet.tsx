import React, {Component} from 'react';
import ColorPicker from "../../color_picker/BaseColorPicker";
import './style/BackgroundSet.less';

interface BackgroundSetProps {
    backgroundColorChanged?: (color: string | string[]) => void;
    backgroundColor?: string;
}

export default class LcCompBackgroundSet extends Component<BackgroundSetProps> {

    backgroundColorChanged = (color: string | string[]) => {
        const {backgroundColorChanged} = this.props;
        backgroundColorChanged && backgroundColorChanged(color);
    }

    render() {
        const {backgroundColor} = this.props;
        return (
            <div className={'lc-config-item'}>
                <label className={'lc-config-item-label'}>背景颜色：</label>
                <ColorPicker color={backgroundColor} className={'lc-config-item-value'}
                             onChange={this.backgroundColorChanged}/>
            </div>
        );
    }
}
