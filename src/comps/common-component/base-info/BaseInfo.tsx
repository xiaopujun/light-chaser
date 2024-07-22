import {Component} from 'react';
import './BaseInfo.less';
import layerManager from "../../../designer/manager/LayerManager.ts";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {ILayerItem} from "../../../designer/DesignerType";
import eventOperateStore from "../../../designer/operate-provider/EventOperateStore";
import baseInfoStore from "./BaseInfoStore";
import rightStore from "../../../designer/right/RightStore";
import editorDesignerLoader from "../../../designer/loader/EditorDesignerLoader";
import layerListStore from "../../../designer/left/layer-list/LayerListStore";
import LayerUtil from "../../../designer/left/layer-list/util/LayerUtil";
import canvasManager from "../../../designer/header/items/canvas/CanvasManager.ts";
import {
    AlignBottomTwo,
    AlignHorizontalCenterTwo,
    AlignLeftTwo,
    AlignRightTwo,
    AlignTopTwo,
    AlignVerticalCenterTwo,
    Info
} from "@icon-park/react";

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
        const {layerConfigs} = layerManager;
        const layer: ILayerItem = layerConfigs[activeElem.id!];
        if (!layer) return;
        if (layer.type === 'group') {
            //分组图层
            const childLayerIds = LayerUtil.findAllChildLayer([layer.id!]).filter((id: string) => layerConfigs[id].type !== 'group');
            const rect = this.calculateGroupRect(childLayerIds);
            this.state = {...layer, ...rect};
        } else {
            //普通组件
            const baseInfo = editorDesignerLoader.definitionMap[layer.type!]?.getBaseInfo();
            this.state = {...layer, version: baseInfo?.version};
        }
    }

    calculateGroupRect = (childLayerIds: string[]) => {
        const {layerConfigs} = layerManager;
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
        const {updateLayer} = layerManager;
        updateLayer && updateLayer([{id: this.state.id!, name: value as string}]);
        //如果显示图层,则更新图层名称
        const {layerInstances} = layerListStore;
        const layerInstance = layerInstances[this.state.id!];
        layerInstance && (layerInstance as Component).setState({name: value});
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    handleMap: Record<string, Function> = {
        "name": this.changeName,
        "width": (value: number) => eventOperateStore.movableRef?.request("resizable", {
            offsetWidth: value as number,
            direction: [1, 1]
        }, true),
        "height": (value: number) => eventOperateStore.movableRef?.request("resizable", {
            offsetHeight: value as number,
            direction: [1, 1]
        }, true),
        "posX": (value: number) => eventOperateStore.movableRef?.request("draggable", {x: value as number}, true),
        "posY": (value: number) => eventOperateStore.movableRef?.request("draggable", {y: value as number}, true),
        "align": (align: string) => this.handleMap[align](),
        "left": () => eventOperateStore.movableRef?.request("draggable", {x: 0}, true),
        "horizontally": () => eventOperateStore.movableRef?.request("draggable", {x: canvasManager.canvasConfig.width! / 2 - this.state.width! / 2}, true),
        "right": () => eventOperateStore.movableRef?.request("draggable", {x: canvasManager.canvasConfig.width! - this.state.width!}, true),
        "top": () => eventOperateStore.movableRef?.request("draggable", {y: 0}, true),
        "vertically": () => eventOperateStore.movableRef?.request("draggable", {y: canvasManager.canvasConfig.height! / 2 - this.state.height! / 2}, true),
        "bottom": () => eventOperateStore.movableRef?.request("draggable", {y: canvasManager.canvasConfig.height! - this.state.height!}, true),
    }

    onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id: key, data} = fieldChangeData;
        const {targetIds, setTargetIds} = eventOperateStore;
        if (!targetIds.includes(this.state.id as string)) {
            const {type} = this.state;
            if (type === 'group') {
                const {layerConfigs} = layerManager;
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
        const {name, width, height, x, y, id} = this.state;
        return {
            type: 'grid',
            children: [
                {
                    id: "name",
                    key: "name",
                    label: "名称",
                    type: "input",
                    value: name,

                },
                {
                    id: "width",
                    key: "width",
                    type: "number-input",
                    label: "宽度",
                    value: width,
                    reRender: true,
                },
                {
                    id: "height",
                    key: "height",
                    type: "number-input",
                    label: "高度",
                    value: height,
                    reRender: true,
                },
                {
                    id: "posX",
                    key: "posX",
                    type: "number-input",
                    label: "X轴",
                    reRender: true,
                    value: x,
                },
                {
                    id: "posY",
                    key: "posY",
                    type: "number-input",
                    label: "Y轴",
                    reRender: true,
                    value: y,
                },
                {
                    id: 'align',
                    label: '对齐',
                    type: 'group-button',
                    config: {
                        items: [
                            {
                                value: 'left',
                                content: <AlignLeftTwo theme="filled"
                                                       size="14"
                                                       strokeWidth={2}
                                                       strokeLinecap="square"/>
                            },
                            {
                                value: 'horizontally',
                                content: <AlignHorizontalCenterTwo theme="filled"
                                                                   size="14"
                                                                   strokeWidth={2}
                                                                   strokeLinecap="square"/>
                            },
                            {
                                value: 'right',
                                content: <AlignRightTwo theme="filled"
                                                        size="14"
                                                        strokeWidth={2}
                                                        strokeLinecap="square"/>
                            },
                            {
                                value: 'top',
                                content: <AlignTopTwo theme="filled"
                                                      size="14"
                                                      strokeWidth={2}
                                                      strokeLinecap="square"/>
                            },
                            {
                                value: 'vertically',
                                content: <AlignVerticalCenterTwo theme="filled"
                                                                 size="14"
                                                                 strokeWidth={2}
                                                                 strokeLinecap="square"/>
                            },
                            {
                                value: 'bottom',
                                content: <AlignBottomTwo theme="filled"
                                                         size="14"
                                                         strokeWidth={2}
                                                         strokeLinecap="square"/>
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
                    <span><Info/> {type} | {version ? `版本: ${version}` : '无版本信息'}</span>
                </div>
                <LCGUI schema={schema} onFieldChange={this.onFieldChange}/>
            </div>
        )
    }
}

export default BaseInfo;
