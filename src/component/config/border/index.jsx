import React, {Component} from 'react';
import {Switch} from "antd";

/**
 * 边框设置
 */
class BorderConfig extends Component {

    updateBorderConfig = (value, e) => {
        const {name} = e.currentTarget;
        const {updateBorderConfig} = this.props;
        updateBorderConfig({[name]: value});
    }

    render() {
        return (
            <>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>显示边框：</label>
                    <div>
                        <Switch name={'showBorder'} onChange={this.updateBorderConfig}
                                className={'config-item-value'}/>
                    </div>

                </div>
            </>
        );
    }
}

export default BorderConfig;