import React, {PureComponent} from 'react';
import './LcBgConfigContent.less';
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Dragger from "antd/es/upload/Dragger";
import {Button} from "antd";
import CfgItemBorder from "../../../lib/config-item/CfgItemBorder";
import {toJS} from "mobx";
import {BackgroundColorMode, BackgroundMode} from "../../../framework/types/DesignerType";
import {ConfigType} from "../../../framework/types/ConfigType";
import ConfigItem from "../../../lib/config-item/ConfigItem";
import ConfigCard from "../../../lib/config-card/ConfigCard";
import Select from "../../../lib/lc-select/Select";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import Radio from "../../../lib/lc-radio/Radio";


class LcBgConfigContent extends PureComponent<ConfigType> {

    //线性渐变颜色
    colors = ['#000000', '#000000'];

    state = {
        config: null
    }

    constructor(props: ConfigType) {
        super(props);
        const {config} = props;
        this.state = {config}
    }

    componentDidMount() {
        const {config: {bgColorMode, bgColor}} = this.props;
        if (bgColorMode === BackgroundColorMode.LINEAR_GRADIENT)
            this.colors = bgColor || ['#000000', '#000000']
    }

    beforeUpload = (file: any) => {
        const fileReader = new FileReader();
        const {updateConfig} = this.props;
        //文件读取完毕后会的处理事件
        fileReader.onload = (event: any) => {
            const blob = new Blob([event.target.result], {type: file.type});
            const bgImgUrl = URL.createObjectURL(blob);
            updateConfig && updateConfig({background: {bgImgUrl: bgImgUrl}});
            const {config}: any = this.state;
            this.setState({config: {...config, ...{bgImgUrl: bgImgUrl}}});
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
        const {config}: any = this.state;
        let bgImgSize = config.bgImgSize;
        let tempBgImgSize = toJS(bgImgSize);
        const {value, name} = data;
        if (name === 'bgX' && tempBgImgSize) {
            tempBgImgSize[0] = parseInt(value);
        } else if (name === 'bgY' && tempBgImgSize) {
            tempBgImgSize[1] = parseInt(value);
        }
        updateConfig && updateConfig({background: {bgImgSize: tempBgImgSize}});
        this.setState({config: {...config, ...{bgImgSize: tempBgImgSize}}})
    }

    bgImgPosChange = (data: any) => {
        const {updateConfig} = this.props;
        const {config}: any = this.state;
        let bgImgPos = config.bgImgPos;
        let tempBgImgPos = toJS(bgImgPos);
        const {value, name} = data;
        if (name === 'posX' && tempBgImgPos) {
            tempBgImgPos[0] = parseInt(value);
        } else if (name === 'posY' && tempBgImgPos) {
            tempBgImgPos[1] = parseInt(value);
        }
        updateConfig && updateConfig({background: {bgImgPos: tempBgImgPos}});
    }

    repeatTypeChange = (value: any) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({background: {bgImgRepeat: value}});
    }

    bgColorModeChange = (e: any) => {
        const {updateConfig} = this.props;
        const {config}: any = this.state;
        updateConfig && updateConfig({background: {bgColorMode: e.target.value}});
        this.setState({config: {...config, ...{bgColorMode: e.target.value}}});
    }

    bgColorChange = (color: string) => {
        const {updateConfig} = this.props;
        updateConfig && updateConfig({background: {bgColor: color}});
    }

    clearBgImg = () => {
        const {config}: any = this.state;
        const {updateConfig} = this.props;
        if (config?.bgImgUrl)
            URL.revokeObjectURL(config.bgImgUrl);
        updateConfig && updateConfig({background: {bgImgUrl: ''}});
        this.setState({config: {...config, ...{bgImgUrl: ''}}});
    }

    bgGradientColorChanged = (color: string, key: string) => {
        const {updateConfig} = this.props;
        const {config}: any = this.state;
        if (key === 'startColor')
            this.colors[0] = color;
        if (key === 'endColor')
            this.colors[1] = color;
        //线性渐变
        if (config?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT) {
            updateConfig && updateConfig({
                background: {
                    bgColor: `linear-gradient(${config.angle}deg, ${this.colors[0]}, ${this.colors[1]})`,
                    colors: [this.colors[0], this.colors[1]]
                }
            });
        }
        //径向渐变
        if (config?.bgColorMode === BackgroundColorMode.RADIAL_GRADIENT) {
            updateConfig && updateConfig({
                background: {
                    bgColor: `radial-gradient(circle, ${this.colors[0]}, ${this.colors[1]})`,
                    colors: [this.colors[0], this.colors[1]]
                }
            });
        }
    }

    gradientAngleChanged = (value: any) => {
        const {updateConfig} = this.props;
        const {config}: any = this.state;
        if (config?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT)
            updateConfig && updateConfig({
                background: {
                    bgColor: `linear-gradient(${value}deg, ${this.colors[0]}, ${this.colors[1]})`,
                    angle: value
                }
            });
        if (config?.bgColorMode === BackgroundColorMode.RADIAL_GRADIENT)
            updateConfig && updateConfig({
                background: {
                    bgColor: `radial-gradient(${this.colors[0]}, ${this.colors[1]})`,
                    angle: value
                }
            });
    }

    render() {
        console.log('LCBackgroundConfig render', toJS(this.props));
        console.log(this.state.config);
        const {config}: any = this.state;
        return (
            <div className={'lc-background-config'}>
                <ConfigItem title={'模式'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <Radio defaultValue={config?.bgMode || BackgroundMode.NONE} onChange={this.bgModeChange}
                           options={[
                               {value: '0', label: '无'},
                               {value: '1', label: '图片'},
                               {value: '2', label: '颜色'}
                           ]}/>
                </ConfigItem>
                {config?.bgMode === BackgroundMode.PICTURE &&
                <>
                    <div className={'lc-bg-upload'}>
                        <div className={'lc-upload-content'}>
                            {config?.bgImgUrl ?
                                <img alt={"bg"} width={'100%'} height={187} src={config.bgImgUrl}/> :
                                <Dragger listType={'picture-card'}
                                         showUploadList={false}
                                         beforeUpload={this.beforeUpload}>
                                    请上传背景图
                                </Dragger>}
                        </div>
                    </div>
                    <br/>
                    {
                        config?.bgImgUrl === '' ? null : <ConfigItem title={'背景控制'} contentStyle={{paddingLeft: 10}}>
                            <Button danger={true} ghost={true}
                                    onClick={this.clearBgImg}
                                    size={'small'}>清除背景图</Button>
                        </ConfigItem>
                    }
                    <ConfigCard title={'尺寸'}>
                        <ConfigItem title={"宽度"}>
                            <UnderLineInput name={'bgX'} type={'number'}
                                            onChange={(value: any) => this.bgImgSizeChange({name: 'bgX', value})}
                                            defaultValue={config.bgImgSize[0]}/>
                        </ConfigItem>
                        <ConfigItem title={"高度"}>
                            <UnderLineInput name={'bgY'} type={'number'}
                                            onChange={(value: any) => this.bgImgSizeChange({name: 'bgY', value})}
                                            defaultValue={config.bgImgSize[1]}/>
                        </ConfigItem>
                    </ConfigCard>
                    <ConfigCard title={'位置'}>
                        <ConfigItem title={"X轴"}>
                            <UnderLineInput type={'number'}
                                            onChange={(value: any) => this.bgImgPosChange({name: 'posX', value})}
                                            defaultValue={config.bgImgPos[0]}/>
                        </ConfigItem>
                        <ConfigItem title={"Y轴"}>
                            <UnderLineInput type={'number'}
                                            onChange={(value: any) => this.bgImgPosChange({name: 'posY', value})}
                                            defaultValue={config.bgImgPos[1]}/>
                        </ConfigItem>
                    </ConfigCard>
                    <ConfigItem title={'重复方式'} contentStyle={{paddingLeft: '20px', width: 120}}>
                        <Select options={[{label: '不重复', value: 'no-repeat'},
                            {label: 'x轴重复', value: 'repeat-x'},
                            {label: 'y轴重复', value: 'repeat-y'},
                            {label: '铺满', value: 'repeat'},
                        ]} defaultValue={config?.bgImgRepeat} onChange={this.repeatTypeChange}/>
                    </ConfigItem>
                </>}
                {config?.bgMode === BackgroundMode.COLOR &&
                <>
                    <ConfigItem title={'类型'} contentStyle={{paddingLeft: '20px'}}>
                        <Radio options={[
                            {value: '0', label: '单色'},
                            {value: '1', label: '线性'},
                            {value: '2', label: '径向'}
                        ]} onChange={this.bgColorModeChange} value={config?.bgColorMode}/>
                    </ConfigItem>
                    {
                        config?.bgColorMode === BackgroundColorMode.SINGLE &&
                        <ConfigItem title={'颜色'} contentStyle={{width: 130, paddingLeft: 18}}>
                            <CfgItemBorder>
                                <BaseColorPicker onChange={this.bgColorChange}
                                                 style={{width: '100%', height: '15px', borderRadius: 2}}
                                                 value={config?.bgColor}
                                                 showText={true}/>
                            </CfgItemBorder>
                        </ConfigItem>
                    }
                    {
                        (config?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT || config?.bgColorMode === BackgroundColorMode.RADIAL_GRADIENT) && <>
                            <ConfigItem title={'颜色'} contentStyle={{width: '250px', paddingLeft: 18, display: "flex"}}>
                                <CfgItemBorder>
                                    <BaseColorPicker
                                        onChange={(value) => this.bgGradientColorChanged(value, 'startColor')}
                                        style={{width: '100%', height: '15px', borderRadius: 2}}
                                        value={config?.colors && config?.colors[0]}
                                        showText={true}/>
                                </CfgItemBorder>
                                &nbsp;&nbsp;
                                <CfgItemBorder>
                                    <BaseColorPicker
                                        onChange={(value) => this.bgGradientColorChanged(value, 'endColor')}
                                        style={{width: '100%', height: '15px', borderRadius: 2}}
                                        value={config?.colors && config?.colors[1]}
                                        showText={true}/>
                                </CfgItemBorder>
                            </ConfigItem>
                            {
                                config?.bgColorMode === BackgroundColorMode.LINEAR_GRADIENT &&
                                <ConfigItem title={'角度'} contentStyle={{paddingLeft: 18}}>
                                    <UnderLineInput type={"number"} defaultValue={config.angle} min={0} max={360}
                                                    onChange={this.gradientAngleChanged}/>
                                </ConfigItem>
                            }
                        </>
                    }
                </>
                }
            </div>
        );
    }
}

export default LcBgConfigContent;