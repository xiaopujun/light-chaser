import React, {Component} from 'react';
import './LcCanvasSet.less';
import CfgGroup from "../base/CfgGroup";
import Dragger from "antd/es/upload/Dragger";
import {Button, Input, message, Select, UploadProps} from "antd";
import PleaseUpload from '../../designer/pleaseupload.png';
import LCNumberInput from "../../base/LCNumberInput";
import {ColumnHeightOutlined, ColumnWidthOutlined, DragOutlined} from "@ant-design/icons";
import BaseColorPicker from "../../base/BaseColorPicker";
import UploadDemo from "../../../test/UploadDemo";

const {Option} = Select;

interface LcCanvasSetProps {
    canvasConfig?: any;
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
        const {canvasConfig} = this.props;
        return [
            {
                label: '大屏名称',
                comp: "LcTextInput",
                config: {
                    value: canvasConfig?.screenName,
                    onChange: this.changeScreenName,
                },
            },
            {
                label: '大屏宽度',
                comp: "LcNumberInput",
                config: {
                    value: canvasConfig?.screenWidth,
                    onChange: this.changeScreenWidth,
                    width: 50
                },
            },
            {
                label: '大屏高度',
                comp: "LcNumberInput",
                config: {
                    value: canvasConfig?.screenHeight,
                    onChange: this.changeScreenHeight,
                    width: 50
                },
            },
            {
                label: '数据存储方式',
                comp: "LcSelect",
                config: {
                    value: canvasConfig?.saveType,
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
                    value: canvasConfig?.screenRatio,
                    onChange: this.changeRatio,
                },
            },
            {
                label: '元素间隔距离',
                comp: "LcNumberInput",
                config: {
                    value: canvasConfig?.elemInterval,
                    onChange: this.changeInterval,
                },
            },
            {
                label: '列划分数量',
                comp: "LcNumberInput",
                config: {
                    value: canvasConfig?.columns,
                    onChange: this.changeColumn,
                },
            },
            {
                label: '元素基准高度',
                comp: "LcNumberInput",
                config: {
                    value: canvasConfig?.baseLineHeight,
                    onChange: this.changeBaseHeight,
                },
            },
            {
                label: '当前元素总数',
                comp: "",
                config: {
                    value: canvasConfig?.elemCount,
                },
            },
        ]
    }

    render() {
        const _props: UploadProps = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
                const {status} = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            onDrop(e) {
                console.log('Dropped files', e.dataTransfer.files);
            },
        };
        return (
            <div className={'lc-global-set'}>
                <div className={'lc-global-set-content'}>
                    {/*<CfgGroup items={this.generateCanvasSet()}/>*/}

                    <div className={'lc-upload'} style={{height: 187, width: '100%'}}>
                        <UploadDemo/>
                    </div>
                    <div className={'lc-cfg-item'}>
                        <div className={'item-name'}>模式</div>
                        <div className={'item-value'}>
                            <Select style={{width: 200}}>
                                <Option value={'img'}>图片</Option>
                                <Option value={'color'}>颜色</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={'lc-cfg-item'}>
                        <div className={'item-name'}>尺寸</div>
                        <div className={'item-value'} style={{display: 'flex'}}>
                            <LCNumberInput width={50} value={1920}/>
                            &nbsp;&nbsp;&nbsp; × &nbsp;&nbsp;&nbsp;
                            <LCNumberInput width={50} value={1080}/>
                        </div>
                    </div>
                    <div className={'lc-cfg-item'}>
                        <div className={'item-name'}>颜色</div>
                        <div className={'item-value'} style={{display: 'flex'}}>
                            <BaseColorPicker/>
                        </div>
                    </div>
                    <div className={'lc-cfg-item'}>
                        <div className={'item-name'}>填充</div>
                        <div className={'item-value'} style={{display: 'flex'}}>
                            <Button type={'primary'}>
                                <ColumnWidthOutlined/>
                            </Button>
                            <Button type={'primary'}>
                                <ColumnHeightOutlined/>
                            </Button>
                            <Button type={'primary'}>
                                <DragOutlined/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LcCanvasSet;