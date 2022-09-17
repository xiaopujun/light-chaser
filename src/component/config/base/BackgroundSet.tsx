import React, {Component} from 'react';
import ColorPicker from "../../color_picker/BaseColorPicker";
import './style/BackgroundSet.less';

interface BackgroundSetProps {
    backgroundColorChanged?: (color: string | string[]) => void;
}

export default class BackgroundSet extends Component<BackgroundSetProps> {
    backgroundColorChanged = (color: string | string[]) => {
        const {backgroundColorChanged} = this.props;
        backgroundColorChanged && backgroundColorChanged(color);
    }

    render() {
        return (
            <div className={'lc-config-item'}>
                <label className={'lc-config-item-label'}>背景颜色：</label>
                <ColorPicker className={'lc-config-item-value'}
                             onChange={this.backgroundColorChanged}/>
            </div>
        );
    }
}
