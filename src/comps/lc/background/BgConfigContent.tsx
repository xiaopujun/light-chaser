import React, {PureComponent} from 'react';
import './BgConfigContent.less';
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Dragger from "antd/es/upload/Dragger";
import {Button} from "antd";
import CfgItemBorder from "../../../lib/config-item/CfgItemBorder";
import {BackgroundColorMode, BackgroundConfig, BackgroundMode} from "../../../designer/DesignerType";
import {ConfigType} from "../../../designer/right/ConfigType";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import ConfigCard from "../../../lib/config-card/ConfigCard";
import Select from "../../../lib/lc-select/Select";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import Radio from "../../../lib/lc-radio/Radio";
import {merge} from "lodash";


class BgConfigContent extends PureComponent<ConfigType> {

    gradientAngle: number = 0;
    bgImgSize: number[] = [0, 0];
    bgImgPos: number[] = [0, 0];
    singleColor: string = '#000000';
    state: any = {
        config: null,
    }

    constructor(props: ConfigType) {
        super(props);
        const {config} = props;
        this.state = {config}
        //以下数据不放在state中管理，避免修改时触发组件的重新渲染。
        this.gradientAngle = config?.bgColor?.linearGradient?.angle || 0;
        this.bgImgSize = config?.bgImg?.bgImgSize || [0, 0];
        this.bgImgPos = config?.bgImg?.bgImgPos || [0, 0];
        this.singleColor = config?.bgColor?.single?.color || '#000000';
    }

    beforeUpload = (file: any) => {
        const fileReader = new FileReader();
        const {updateConfig} = this.props;
        //文件读取完毕后会的处理事件
        fileReader.onload = (event: any) => {
            const blob = new Blob([event.target.result], {type: file.type});
            const bgImgUrl = URL.createObjectURL(blob);
            updateConfig && updateConfig({background: {bgImg: {bgImgUrl: bgImgUrl}}});
            const {config}: any = this.state;
            this.setState({config: merge({}, config, {bgImg: {bgImgUrl: bgImgUrl}})});
            //todo 更换图片的时候要释放链接和内存的关联，可以提高部分性能
            // URL.revokeObjectURL(bgImgUrl);
        };
        //通过二进制流读取文件，读取完毕后会调用上方设置好的onload事件
        fileReader.readAsArrayBuffer(file);
        return false;
    }

    bgModeChange = (value: any) => {
        const {updateConfig} = this.props;
        const {config}: any = this.state;
        updateConfig && updateConfig({background: {bgMode: value}});
        this.setState({config: {...config, ...{bgMode: value}}});
    }

    bgImgSizeChange = (data: any) => {
        const {updateConfig} = this.props;
        const config: BackgroundConfig = this.state.config;
        let bgImgSize = config.bgImg.bgImgSize;
        const {value, name} = data;
        if (name === 'bgX' && bgImgSize) {
            bgImgSize[0] = parseInt(value);
        } else if (name === 'bgY' && bgImgSize) {
            bgImgSize[1] = parseInt(value);
        }
        updateConfig && updateConfig({background: {bgImg: {bgImgSize: bgImgSize}}});
        this.bgImgSize = bgImgSize;
    }

    bgImgPosChange = (data: any) => {
        const {updateConfig} = this.props;
        const config: BackgroundConfig = this.state.config;
        let bgImgPos = config.bgImg.bgImgPos;
        const {value, name} = data;
        if (name === 'posX' && bgImgPos) {
            bgImgPos[0] = parseInt(value);
        } else if (name === 'posY' && bgImgPos) {
            bgImgPos[1] = parseInt(value);
        }
        updateConfig && updateConfig({background: {bgImg: {bgImgPos: bgImgPos}}});
        this.bgImgPos = bgImgPos;
    }

    repeatTypeChange = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({background: {bgImg: {bgImgRepeat: value}}});
    }

    bgColorModeChange = (value: any) => {
        const {updateConfig} = this.props;
        const config: BackgroundConfig = this.state.config;
        updateConfig && updateConfig({background: {bgColor: {bgColorMode: value}}});
        this.setState({config: merge({}, config, {bgColor: {bgColorMode: value}})});
    }

    singleColorChanged = (color: string) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({background: {bgColor: {single: {color}}}});
        this.singleColor = color;
    }

    clearBgImg = () => {
        const {config}: any = this.state;
        const {updateConfig} = this.props;
        if (config?.bgImgUrl)
            URL.revokeObjectURL(config.bgImgUrl);
        updateConfig && updateConfig({background: {bgImg: {bgImgUrl: ''}}});
        this.setState({config: merge({}, config, {bgImg: {bgImgUrl: ''}})});
    }

    linearGradientChanged = (color: string, key: string) => {
        const {updateConfig} = this.props;
        const config: BackgroundConfig = this.state.config;
        let {colorArr, angle} = config.bgColor.linearGradient;
        if (key === 'startColor')
            colorArr[0] = color;
        if (key === 'endColor')
            colorArr[1] = color;
        //线性渐变
        updateConfig && updateConfig({
            background: {
                bgColor: {
                    linearGradient: {
                        color: `linear-gradient(${angle}deg, ${colorArr[0]}, ${colorArr[1]})`,
                        colorArr: colorArr,
                    }
                },
            }
        });
    }

    radialGradientChanged = (color: string, key: string) => {
        const {updateConfig} = this.props;
        const config: BackgroundConfig = this.state.config;
        let {colorArr} = config.bgColor.radialGradient;
        if (key === 'startColor')
            colorArr[0] = color;
        if (key === 'endColor')
            colorArr[1] = color;
        //径向渐变
        updateConfig && updateConfig({
            background: {
                bgColor: {
                    radialGradient: {
                        color: `radial-gradient(circle, ${colorArr[0]}, ${colorArr[1]})`,
                        colorArr: colorArr,
                    }
                },
            }
        });
    }

    gradientAngleChanged = (value: any) => {
        const {updateConfig} = this.props;
        const config: BackgroundConfig = this.state.config;
        const {colorArr} = config.bgColor.linearGradient;
        updateConfig && updateConfig({
            background: {
                bgColor: {
                    linearGradient: {
                        color: `linear-gradient(${value}deg, ${colorArr[0]}, ${colorArr[1]})`,
                        angle: value
                    }
                },
            }
        });
        this.gradientAngle = value;
    }

    render() {
        const config: BackgroundConfig = this.state.config;
        const {bgMode, bgImg, bgColor} = config;
        return (
            <div className={'lc-background-config'}>
                <ConfigItem title={'模式'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <Radio defaultValue={bgMode || BackgroundMode.NONE} onChange={this.bgModeChange}
                           options={[
                               {value: '0', label: '无'},
                               {value: '1', label: '图片'},
                               {value: '2', label: '颜色'}
                           ]}/>
                </ConfigItem>
                {bgMode === BackgroundMode.PICTURE &&
                <>
                    <div className={'lc-bg-upload'}>
                        <div className={'lc-upload-content'}>
                            {bgImg?.bgImgUrl ?
                                <img alt={"bg"} width={'100%'} height={187} src={bgImg?.bgImgUrl}/> :
                                <Dragger listType={'picture-card'}
                                         showUploadList={false}
                                         beforeUpload={this.beforeUpload}>
                                    请上传背景图
                                </Dragger>}
                        </div>
                    </div>
                    <br/>
                    {
                        bgImg?.bgImgUrl === '' ? null : <ConfigItem title={'背景控制'} contentStyle={{paddingLeft: 10}}>
                            <Button danger={true} ghost={true}
                                    onClick={this.clearBgImg}
                                    size={'small'}>清除背景图</Button>
                        </ConfigItem>
                    }
                    <ConfigCard title={'尺寸'}>
                        <ConfigItem title={"宽度"}>
                            <UnderLineInput name={'bgX'} type={'number'}
                                            onChange={(value: any) => this.bgImgSizeChange({name: 'bgX', value})}
                                            defaultValue={this.bgImgSize[0]}/>
                        </ConfigItem>
                        <ConfigItem title={"高度"}>
                            <UnderLineInput name={'bgY'} type={'number'}
                                            onChange={(value: any) => this.bgImgSizeChange({name: 'bgY', value})}
                                            defaultValue={this.bgImgSize[1]}/>
                        </ConfigItem>
                    </ConfigCard>
                    <ConfigCard title={'位置'}>
                        <ConfigItem title={"X轴"}>
                            <UnderLineInput type={'number'}
                                            onChange={(value: any) => this.bgImgPosChange({name: 'posX', value})}
                                            defaultValue={this.bgImgPos[0]}/>
                        </ConfigItem>
                        <ConfigItem title={"Y轴"}>
                            <UnderLineInput type={'number'}
                                            onChange={(value: any) => this.bgImgPosChange({name: 'posY', value})}
                                            defaultValue={this.bgImgPos[1]}/>
                        </ConfigItem>
                    </ConfigCard>
                    <ConfigItem title={'重复方式'} contentStyle={{paddingLeft: '20px', width: 120}}>
                        <Select options={[{label: '不重复', value: 'no-repeat'},
                            {label: 'x轴重复', value: 'repeat-x'},
                            {label: 'y轴重复', value: 'repeat-y'},
                            {label: '铺满', value: 'repeat'},
                        ]} defaultValue={bgImg?.bgImgRepeat} onChange={this.repeatTypeChange}/>
                    </ConfigItem>
                </>}
                {bgMode === BackgroundMode.COLOR &&
                <>
                    <ConfigItem title={'类型'} contentStyle={{paddingLeft: '20px', width: '80%'}}>
                        <Radio options={[
                            {value: '0', label: '单色'},
                            {value: '1', label: '线性'},
                            {value: '2', label: '径向'}
                        ]} onChange={this.bgColorModeChange} defaultValue={bgColor?.bgColorMode + ''}/>
                    </ConfigItem>
                    {
                        bgColor?.bgColorMode + '' === BackgroundColorMode.SINGLE &&
                        <ConfigItem title={'颜色'} contentStyle={{width: 130, paddingLeft: 18}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.singleColorChanged}
                                                 style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 defaultValue={this.singleColor}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                    }
                    {
                        (bgColor?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT) && <>
                            <ConfigItem title={'颜色'} contentStyle={{width: '250px', paddingLeft: 18, display: "flex"}}>
                                <CfgItemBorder>
                                    <BaseColorPicker
                                        onChange={(value) => this.linearGradientChanged(value, 'startColor')}
                                        style={{width: '100%', height: '15px', borderRadius: 2}}
                                        defaultValue={bgColor.linearGradient?.colorArr[0]}
                                        showText={true}/>
                                </CfgItemBorder>
                                &nbsp;&nbsp;
                                <CfgItemBorder>
                                    <BaseColorPicker
                                        onChange={(value) => this.linearGradientChanged(value, 'endColor')}
                                        style={{width: '100%', height: '15px', borderRadius: 2}}
                                        defaultValue={bgColor.linearGradient?.colorArr[1]}
                                        showText={true}/>
                                </CfgItemBorder>
                            </ConfigItem>
                            <ConfigItem title={'角度'} contentStyle={{paddingLeft: 18}}>
                                <UnderLineInput type={"number"} defaultValue={this.gradientAngle} min={0}
                                                max={360} onChange={this.gradientAngleChanged}/>
                            </ConfigItem>
                        </>
                    }
                    {
                        (bgColor?.bgColorMode === BackgroundColorMode.RADIAL_GRADIENT) && <>
                            <ConfigItem title={'颜色'} contentStyle={{width: '250px', paddingLeft: 18, display: "flex"}}>
                                <CfgItemBorder>
                                    <BaseColorPicker
                                        onChange={(value) => this.radialGradientChanged(value, 'startColor')}
                                        style={{width: '100%', height: '15px', borderRadius: 2}}
                                        defaultValue={bgColor.radialGradient?.colorArr[0]}
                                        showText={true}/>
                                </CfgItemBorder>
                                &nbsp;&nbsp;
                                <CfgItemBorder>
                                    <BaseColorPicker
                                        onChange={(value) => this.radialGradientChanged(value, 'endColor')}
                                        style={{width: '100%', height: '15px', borderRadius: 2}}
                                        defaultValue={bgColor.radialGradient?.colorArr[1]}
                                        showText={true}/>
                                </CfgItemBorder>
                            </ConfigItem>
                        </>
                    }
                </>
                }
            </div>
        );
    }
}

export default BgConfigContent;