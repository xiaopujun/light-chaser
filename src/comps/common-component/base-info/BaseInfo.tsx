import {Component} from 'react';
import './BaseInfo.less';
import designerStore from "../../../designer/store/DesignerStore";
import layerListStore from "../../../designer/float-configs/layer-list/LayerListStore";
import {ComponentBaseProps} from "../common-types";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {InfoCircleOutlined} from "@ant-design/icons";
import alignLeft from './icon/align-left.svg';
import alignHorizontally from './icon/align-horizontally.svg';
import alignRight from './icon/align-right.svg';
import alignTop from './icon/align-top.svg';
import alignVertically from './icon/align-vertically.svg';
import alignBottom from './icon/align-bottom.svg';
import {ILayerItem} from "../../../designer/DesignerType";
import eventOperateStore from "../../../designer/operate-provider/EventOperateStore";
import baseInfoStore from "./BaseInfoStore";

/**
 * lc组件基础信息
 */
class BaseInfo extends Component<ConfigType, ILayerItem> {

    constructor(props: ConfigType) {
        super(props);
        const {controller} = props;
        const {id} = (controller.getConfig() as ComponentBaseProps).base!;
        const {layerConfigs} = designerStore;
        this.state = layerConfigs[id];
    }

    componentDidMount() {
        const {setBaseConfigRef} = baseInfoStore;
        setBaseConfigRef && setBaseConfigRef(this);
    }

    changeName = (value: string) => {
        const {controller} = this.props;
        controller.update({base: {name: value}}, {reRender: false});
        const {updateLayer} = designerStore;
        const id = controller.getConfig().base.id;
        updateLayer && updateLayer([{id, name: value}]);
        //如果显示图层,则更新图层名称
        const {layerInstances} = layerListStore;
        let layerInstance = layerInstances[id];
        layerInstance && (layerInstance as Component).setState({name: value});
    }

    doAlign = (type: string) => {
        const {movableRef} = eventOperateStore;
        const {canvasConfig: {width, height}} = designerStore;
        switch (type) {
            case 'left':
                movableRef?.current?.request("draggable", {x: 0}, true);
                break;
            case 'horizontally':
                movableRef?.current?.request("draggable", {x: width! / 2 - this.state.width! / 2}, true);
                break;
            case 'right':
                movableRef?.current?.request("draggable", {x: width! - this.state.width!}, true);
                break;
            case 'top':
                movableRef?.current?.request("draggable", {y: 0}, true);
                break;
            case 'vertically':
                movableRef?.current?.request("draggable", {y: height! / 2 - this.state.height! / 2}, true);
                break;
            case 'bottom':
                movableRef?.current?.request("draggable", {y: height! - this.state.height!}, true);
                break;
        }
    }


    onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data} = fieldChangeData;
        const {movableRef, targetIds, setTargetIds} = eventOperateStore;
        if (!targetIds.includes(this.state.id as string))
            setTargetIds([this.state.id as string]);
        const layerTimer = setTimeout(() => {
            switch (id) {
                case 'name':
                    const {controller} = this.props;
                    controller.update({base: {name: data}}, {reRender: false});
                    const {updateLayer} = designerStore;
                    updateLayer && updateLayer([{id: this.state.id!, name: data as string}]);
                    //如果显示图层,则更新图层名称
                    const {layerInstances} = layerListStore;
                    let layerInstance = layerInstances[this.state.id!];
                    layerInstance && (layerInstance as Component).setState({name: data});
                    break;
                case 'width':
                    movableRef?.current?.request("resizable", {offsetWidth: data as number, direction: [1, 1]}, true);
                    break;
                case 'height':
                    movableRef?.current?.request("resizable", {offsetHeight: data as number, direction: [1, 1]}, true);
                    break;
                case 'posX':
                    movableRef?.current?.request("draggable", {x: data as number}, true);
                    break;
                case 'posY':
                    movableRef?.current?.request("draggable", {y: data as number}, true);
                    break;
                case 'align':
                    this.doAlign(data as string);
                    break;
            }
            clearTimeout(layerTimer);
        }, 1);
    }

    buildSchema = (): Control => {
        const {name, width, height, x, y} = this.state;
        return {
            type: 'grid',
            config: {
                columns: 2
            },
            children: [
                {
                    id: "name",
                    key: "name",
                    label: "名称",
                    type: "input",
                    value: name,
                    config: {
                        gridColumn: '1/3'
                    }
                },
                {
                    type: 'grid',
                    label: '尺寸',
                    config: {
                        gridColumn: '1/3',
                        columns: 2
                    },
                    children: [
                        {
                            id: "width",
                            key: "width",
                            type: "input",
                            label: "宽度",
                            value: width,
                            reRender: true,
                            config: {
                                type: "number",
                            }
                        },
                        {
                            id: "height",
                            key: "height",
                            type: "input",
                            label: "高度",
                            value: height,
                            reRender: true,
                            config: {
                                type: "number",
                            }
                        },
                    ]
                },
                {
                    type: 'grid',
                    label: '位置',
                    config: {
                        gridColumn: '1/3',
                        columns: 2
                    },
                    children: [
                        {
                            id: "posX",
                            key: "posX",
                            type: "input",
                            label: "X轴",
                            reRender: true,
                            value: x,
                            config: {
                                type: "number",
                            }
                        },
                        {
                            id: "posY",
                            key: "posY",
                            type: "input",
                            label: "Y轴",
                            reRender: true,
                            value: y,
                            config: {
                                type: "number",
                            }
                        },
                    ]
                },
                {
                    id: 'align',
                    label: '对齐',
                    type: 'group-button',
                    config: {
                        gridColumn: '1/3',
                        items: [
                            {
                                value: 'left',
                                content: <img src={alignLeft} alt={'left'}/>
                            },
                            {
                                value: 'horizontally',
                                content: <img src={alignHorizontally} alt={'horizontally'}/>
                            },
                            {
                                value: 'right',
                                content: <img src={alignRight} alt={'right'}/>
                            },
                            {
                                value: 'top',
                                content: <img src={alignTop} alt={'top'}/>
                            },
                            {
                                value: 'vertically',
                                content: <img src={alignVertically} alt={'vertically'}/>
                            },
                            {
                                value: 'bottom',
                                content: <img src={alignBottom} alt={'bottom'}/>
                            }
                        ]
                    }
                }
            ]
        }
    }

    render() {
        const {type} = this.state;
        const schema = this.buildSchema();
        return (
            <div className={'base-info-config'}>
                <div className={'version-info'}>
                    <span><InfoCircleOutlined/> {type} | 版本: v1.0.0</span>
                </div>
                <LCGUI schema={schema} onFieldChange={this.onFieldChange}/>
            </div>
        )
    }
}

export default BaseInfo;