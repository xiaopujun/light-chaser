import React, {Component} from 'react';
import LCNumberInput from "../../base/LCNumberInput";
import './LcGlobalSet.less';

interface LcGlobalSetProps {
    globalSet?: any;
    updateBaseInfo?: (data?: any) => void;
}

class LcGlobalSet extends Component<LcGlobalSetProps> {

    changeScreenName = (name: string) => {

    }
    changeScreenWidth = (width: string) => {

    }
    changeScreenHeight = (height: string) => {

    }

    generateGlobalSet = () => {
        const {globalSet} = this.props;
        return [
            {
                labelName: '大屏名称',
                compName: "LcTextInput",
                config: {
                    value: globalSet?.name,
                    onChange: this.changeScreenName,
                },
            },
            {
                labelName: '大屏宽度',
                compName: "LcNumberInput",
                config: {
                    data: globalSet?.screenWidth,
                    onChange: this.changeScreenWidth,
                },
            },
            {
                labelName: '大屏高度',
                compName: "LcNumberInput",
                config: {
                    data: globalSet?.screenHeight,
                    onChange: this.changeScreenHeight,
                },
            },
        ]
    }

    render() {
        const {globalSet} = this.props;
        return (
            <div className={'lc-global-set'}>
                <div className={'lc-global-set-title'}>全局配置</div>
                <div className={'lc-global-set-content'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>大屏名称：</label>
                        <div className={'lc-config-item-value'}>
                            <div className={'lc-input-container'}>
                                <label>测试大屏01</label>
                            </div>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>大屏宽度：</label>
                        <div className={'lc-config-item-value'}>
                            <div className={'lc-input-container'}>
                                <LCNumberInput value={globalSet.screenWidth} width={45}/>
                            </div>
                        </div>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>大屏高度：</label>
                        <div className={'lc-config-item-value'}>
                            <div className={'lc-input-container'}>
                                <LCNumberInput value={globalSet.screenHeight} width={45}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LcGlobalSet;