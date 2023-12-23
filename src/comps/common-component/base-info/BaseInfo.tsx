import {Component} from 'react';
import './BaseInfo.less';
import designerStore from "../../../designer/store/DesignerStore";
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
import rightStore from "../../../designer/right/RightStore";
import EditorDesignerLoader from "../../../designer/loader/EditorDesignerLoader";
import layerListStore from "../../../designer/left/layer-list/LayerListStore";
import LayerUtil from "../../../designer/left/layer-list/util/LayerUtil";

/**
 * lc组件基础信息
 */
class BaseInfo extends Component<ConfigType, ILayerItem & { version?: string }> {

    constructor(props: ConfigType) {
        super(props);
        this.init();
    }

    init = () => {
        const {activeElem} = rightStore;
        const {layerConfigs} = designerStore;
        const layer: ILayerItem = layerConfigs[activeElem.id!];
        if (!layer) return;
        if (layer.type === 'group') {
            //分组图层
            const childLayerIds = LayerUtil.findAllChildLayer([layer.id!]).filter((id: string) => layerConfigs[id].type !== 'group');
            const rect = this.calculateGroupRect(childLayerIds);
            this.state = {...layer, ...rect};
        } else {
            //普通组件
            const baseInfo = EditorDesignerLoader.getInstance().definitionMap[layer.type!]?.getBaseInfo();
            this.state = {...layer, version: baseInfo?.version};
        }
    }

    calculateGroupRect = (childLayerIds: string[]) => {
        const {layerConfigs} = designerStore;
        let minX = +Infinity, minY = +Infinity, maxX = -Infinity, maxY = -Infinity;
        childLayerIds.forEach((layerId: string) => {
            const {x = 0, y = 0, width = 0, height = 0} = layerConfigs[layerId];
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + width);
            maxY = Math.max(maxY, y + height);
        });
        return {x: minX, y: minY, width: maxX - minX, height: maxY - minY};
    }

    componentDidMount() {
        const {setBaseConfigRef} = baseInfoStore;
        setBaseConfigRef && setBaseConfigRef(this);
    }

    componentWillUnmount() {
        const {setBaseConfigRef} = baseInfoStore;
        setBaseConfigRef && setBaseConfigRef(null);
    }

    changeName = (value: string) => {
        const {controller} = this.props;
        controller.update({base: {name: value}}, {reRender: false});
        const {updateLayer} = designerStore;
        updateLayer && updateLayer([{id: this.state.id!, name: value as string}]);
        //如果显示图层,则更新图层名称
        const {layerInstances} = layerListStore;
        let layerInstance = layerInstances[this.state.id!];
        layerInstance && (layerInstance as Component).setState({name: value});
    }

    handleMap: Record<string, Function> = {
        "name": this.changeName,
        "width": (value: number) => eventOperateStore.movableRef?.current?.request("resizable", {
            offsetWidth: value as number,
            direction: [1, 1]
        }, true),
        "height": (value: number) => eventOperateStore.movableRef?.current?.request("resizable", {
            offsetHeight: value as number,
            direction: [1, 1]
        }, true),
        "posX": (value: number) => eventOperateStore.movableRef?.current?.request("draggable", {x: value as number}, true),
        "posY": (value: number) => eventOperateStore.movableRef?.current?.request("draggable", {y: value as number}, true),
        "align": (align: string) => this.handleMap[align](),
        "left": () => eventOperateStore.movableRef?.current?.request("draggable", {x: 0}, true),
        "horizontally": () => eventOperateStore.movableRef?.current?.request("draggable", {x: designerStore.canvasConfig.width! / 2 - this.state.width! / 2}, true),
        "right": () => eventOperateStore.movableRef?.current?.request("draggable", {x: designerStore.canvasConfig.width! - this.state.width!}, true),
        "top": () => eventOperateStore.movableRef?.current?.request("draggable", {y: 0}, true),
        "vertically": () => eventOperateStore.movableRef?.current?.request("draggable", {y: designerStore.canvasConfig.height! / 2 - this.state.height! / 2}, true),
        "bottom": () => eventOperateStore.movableRef?.current?.request("draggable", {y: designerStore.canvasConfig.height! - this.state.height!}, true),
    }

    onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id: key, data} = fieldChangeData;
        const {targetIds, setTargetIds} = eventOperateStore;
        if (!targetIds.includes(this.state.id as string)) {
            const {type} = this.state;
            if (type === 'group') {
                const {layerConfigs} = designerStore;
                const childIds = LayerUtil.findAllChildLayer([this.state.id!]).filter((id: string) => layerConfigs[id].type !== 'group');
                setTargetIds(childIds!);
            } else {
                setTargetIds([this.state.id as string]);
            }
        }
        const layerTimer = setTimeout(() => {
            this.handleMap[key!](data);
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
        const {type, version} = this.state;
        const schema = this.buildSchema();
        return (
            <div className={'base-info-config'}>
                <div className={'version-info'}>
                    <span><InfoCircleOutlined/> {type} | {version ? `版本: ${version}` : '无版本信息'}</span>
                </div>
                <LCGUI schema={schema} onFieldChange={this.onFieldChange}/>
            </div>
        )
    }
}

export default BaseInfo;