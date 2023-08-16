import React, {Component} from 'react';
import './ColorMode.less';
import Select from "../lc-select/Select";
import CfgItemBorder from "../lc-config-item/CfgItemBorder";
import BaseColorPicker from "../lc-color-picker/BaseColorPicker";
import GroupColorPicker from "../lc-color-picker/GroupColorPicker";

class ColorMode extends Component {

    state = {
        mode: 'single',
        value: '#fff',
    }

    render() {
        const {mode, value} = this.state;
        return (
            <div className={"lc-color-mode"}>
                <div className={'mode-select'}>
                    <Select defaultValue={"single"}
                            onChange={(value: string) => this.setState({mode: value})}
                            options={[
                                {value: 'single', label: '单色'},
                                {value: 'multi', label: '多色'},
                                {value: 'gradient', label: '渐变'},
                            ]}/>
                </div>
                {
                    mode === 'single' && <CfgItemBorder width={'100px'}>
                        <BaseColorPicker
                            defaultValue={"#fff"}
                            style={{width: '100px', height: '15px', borderRadius: 2}}
                            showText={true}/>
                    </CfgItemBorder>
                }
                {
                    mode === 'multi' && <GroupColorPicker value={["#00ffdb", "#ffac4b"]}/>
                }
                {
                    mode === 'gradient' && <GroupColorPicker value={["#ff3c00", "#1a2d40"]}/>
                }

            </div>
        );
    }
}

export default ColorMode;