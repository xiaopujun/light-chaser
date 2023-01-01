import React, {Component} from 'react';
import './LcCanvasSet.less';
import CfgGroup from "../base/CfgGroup";

interface LcCanvasSetProps {
    canvasSet?: any;
    updateCanvasSet?: (data?: any) => void;
}

class LcCanvasSet extends Component<LcCanvasSetProps> {

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
        const {updateCanvasSet} = this.props;
        updateCanvasSet && updateCanvasSet({columns: columns})
    }
    changeBaseHeight = (height: number) => {

    }

    generateCanvasSet = () => {
        const {canvasSet} = this.props;
        return [
            {
                label: '大屏名称',
                comp: "LcTextInput",
                config: {
                    value: canvasSet?.screenName,
                    onChange: this.changeScreenName,
                },
            },
            {
                label: '大屏宽度',
                comp: "LcNumberInput",
                config: {
                    value: canvasSet?.screenWidth,
                    onChange: this.changeScreenWidth,
                    width: 50
                },
            },
            {
                label: '大屏高度',
                comp: "LcNumberInput",
                config: {
                    value: canvasSet?.screenHeight,
                    onChange: this.changeScreenHeight,
                    width: 50
                },
            },
            {
                label: '数据存储方式',
                comp: "LcSelect",
                config: {
                    value: canvasSet?.saveType,
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
                    value: canvasSet?.screenRatio,
                    onChange: this.changeRatio,
                },
            },
            {
                label: '元素间隔距离',
                comp: "LcNumberInput",
                config: {
                    value: canvasSet?.elemInterval,
                    onChange: this.changeInterval,
                },
            },
            {
                label: '列划分数量',
                comp: "LcNumberInput",
                config: {
                    value: canvasSet?.columns,
                    onChange: this.changeColumn,
                },
            },
            {
                label: '元素基准高度',
                comp: "LcNumberInput",
                config: {
                    value: canvasSet?.baseLineHeight,
                    onChange: this.changeBaseHeight,
                },
            },
            {
                label: '当前元素总数',
                comp: "",
                config: {
                    value: canvasSet?.elemCount,
                },
            },
        ]
    }

    render() {
        return (
            <div className={'lc-global-set'}>
                <div className={'lc-global-set-title'}>全局配置</div>
                <div className={'lc-global-set-content'}>
                    <CfgGroup items={this.generateCanvasSet()}/>
                </div>
            </div>
        );
    }
}

export default LcCanvasSet;