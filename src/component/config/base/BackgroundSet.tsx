import React, {Component} from 'react';
import ColorPicker from "../../color_picker/BaseColorPicker";

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
            <div className={'config-item'}>
                <label className={'config-item-label'}>颜色：</label>
                <ColorPicker className={'config-item-value'}
                             onChange={this.backgroundColorChanged}/>
            </div>
        );
    }
}
