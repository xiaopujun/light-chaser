import React, {Component} from 'react';
import './LcGlobalSet.less';
import CfgGroup from "../base/CfgGroup";

interface LcGlobalSetProps {
    globalSet?: any;
    updateGlobalSet?: (data?: any) => void;
}

class LcGlobalSet extends Component<LcGlobalSetProps> {

    changeScreenName = (name: string) => {

    }
    changeScreenWidth = (width: string) => {

    }
    changeScreenHeight = (height: string) => {

    }

    changeSaveType = (type: string) => {

    }
    changeRatio = (ratio: number) => {

    }
    changeInterval = (interval: number) => {

    }
    changeColumn = (columns: number) => {
        const {updateGlobalSet} = this.props;
        updateGlobalSet && updateGlobalSet({columns: columns})
    }
    changeBaseHeight = (height: number) => {

    }

    generateGlobalSet = () => {
        const {globalSet} = this.props;
        return [
            {
                label: '大屏名称',
                comp: "LcTextInput",
                config: {
                    value: globalSet?.screenName,
                    onChange: this.changeScreenName,
                },
            },
            {
                label: '大屏宽度',
                comp: "LcNumberInput",
                config: {
                    value: globalSet?.screenWidth,
                    onChange: this.changeScreenWidth,
                    width: 50
                },
            },
            {
                label: '大屏高度',
                comp: "LcNumberInput",
                config: {
                    value: globalSet?.screenHeight,
                    onChange: this.changeScreenHeight,
                    width: 50
                },
            },
            {
                label: '数据存储方式',
                comp: "LcSelect",
                config: {
                    value: globalSet?.saveType,
                    onChange: this.changeSaveType,
                    options: [
                        {
                            content: '本地',
                            value: 'local'
                        },
                        {
                            content: '远程',
                            value: 'server'
                        },
                    ]
                },
            },
            {
                label: '屏幕比例',
                comp: "LcTextInput",
                config: {
                    value: globalSet?.screenRatio,
                    onChange: this.changeRatio,
                },
            },
            {
                label: '元素间隔距离',
                comp: "LcNumberInput",
                config: {
                    value: globalSet?.elemInterval,
                    onChange: this.changeInterval,
                },
            },
            {
                label: '列划分数量',
                comp: "LcNumberInput",
                config: {
                    value: globalSet?.columns,
                    onChange: this.changeColumn,
                },
            },
            {
                label: '元素基准高度',
                comp: "LcNumberInput",
                config: {
                    value: globalSet?.baseLineHeight,
                    onChange: this.changeBaseHeight,
                },
            },
            {
                label: '当前元素总数',
                comp: "",
                config: {
                    value: globalSet?.elemCount,
                },
            },
        ]
    }

    render() {
        return (
            <div className={'lc-global-set'}>
                <div className={'lc-global-set-title'}>全局配置</div>
                <div className={'lc-global-set-content'}>
                    <CfgGroup items={this.generateGlobalSet()}/>
                </div>
            </div>
        );
    }
}

export default LcGlobalSet;