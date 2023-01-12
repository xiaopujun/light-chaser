import React, {Component} from 'react';
import './style/PaddingSet.less';
import LcUnderLineInput from "../../base/LcUnderLineInput";

interface PaddingSetProps {
    value?: string;
    count?: number;
    onChange?: (data: string) => void;
    unit?: string;
}

export default class PaddingSet extends Component<PaddingSetProps> {

    private static ALONE = 'alone';
    private static TOP_BOTTOM = 'top-bottom';
    private static LEFT_RIGHT = 'left-right';
    private static ALL = 'all';

    state: any = {
        mode: [PaddingSet.ALONE, PaddingSet.TOP_BOTTOM, PaddingSet.LEFT_RIGHT, PaddingSet.ALL],
        modeIndex: 0,
        dataArr: [0, 0, 0, 0],
        data: ''
    }

    onChange = (e: any) => {
        let name = e.currentTarget.name;
        let value = parseInt(e.currentTarget.value);
        switch (name) {
            case 'top':
                this.calculateModeValue(0, value, name);
                break;
            case 'bottom':
                this.calculateModeValue(2, value, name);
                break;
            case 'left':
                this.calculateModeValue(3, value, name);
                break;
            case 'right':
                this.calculateModeValue(1, value, name);
                break;
            default:
        }
    }

    calculateModeValue = (index: number, value: number, position: string) => {
        let {modeIndex, mode, dataArr} = this.state;
        let currentMode = mode[modeIndex];
        switch (currentMode) {
            case PaddingSet.TOP_BOTTOM:
                if (currentMode.indexOf(position) > -1) {
                    dataArr[0] = value;
                    dataArr[2] = value;
                } else {
                    dataArr[index] = value;
                }
                break;
            case PaddingSet.LEFT_RIGHT:
                if (currentMode.indexOf(position) > -1) {
                    dataArr[1] = value;
                    dataArr[3] = value;
                } else {
                    dataArr[index] = value;
                }
                break;
            case PaddingSet.ALL:
                dataArr = [value, value, value, value];
                break;
            default:
                dataArr[index] = value;
        }
        this.setState({dataArr: [...dataArr]});
    }

    modeChange = () => {
        let {mode, modeIndex} = this.state;
        modeIndex++;
        if (modeIndex === mode.length)
            modeIndex = 0;
        this.setState({modeIndex});
    }

    render() {
        const {dataArr, mode, modeIndex} = this.state;
        return (
            <div className={'lc-padding-config'}>
                <div className={'lc-padding-content'}>
                    <div className={'lc-padding-top'}>
                        <LcUnderLineInput type={'number'}
                                          value={dataArr[0]}
                                          name={'top'}
                                          onChange={this.onChange}
                                          inputStyle={{width: 25, textAlign: 'center'}}
                                          containStyle={{width: 25}}/><span>px</span>
                    </div>
                    <div className={'lc-padding-middle'}>
                        <div className={'lc-padding-left'}>
                            <LcUnderLineInput type={'number'}
                                              name={'left'}
                                              value={dataArr[3]}
                                              onChange={this.onChange}
                                              inputStyle={{width: 25, textAlign: 'center'}}
                                              containStyle={{width: 25}}/><span>px</span>
                        </div>
                        <div className={'lc-padding-center'} onClick={this.modeChange}>{mode[modeIndex]}</div>
                        <div className={'lc-padding-right'}>
                            <LcUnderLineInput name={'right'}
                                              type={'number'}
                                              value={dataArr[1]}
                                              onChange={this.onChange}
                                              inputStyle={{width: 25, textAlign: 'center'}}
                                              containStyle={{width: 25}}/><span>px</span>
                        </div>
                    </div>
                    <div className={'lc-padding-bottom'}>
                        <LcUnderLineInput type={'number'}
                                          name={'bottom'}
                                          value={dataArr[2]}
                                          onChange={this.onChange}
                                          inputStyle={{width: 25, textAlign: 'center'}}
                                          containStyle={{width: 25}}/>
                        <span>px</span>
                    </div>
                </div>
            </div>
        );
    }
}
