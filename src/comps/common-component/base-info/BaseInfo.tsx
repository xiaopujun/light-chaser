import {Component} from 'react';
import './BaseInfo.less';
import designerStore from "../../../designer/store/DesignerStore";
import layerListStore from "../../../designer/float-configs/layer-list/LayerListStore";
import {ComponentBaseProps} from "../common-types";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import LCGUIUtil from "../../../json-schema/LCGUIUtil";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {UIContainer} from "../../../ui/ui-container/UIContainer";
import {InfoCircleOutlined} from "@ant-design/icons";
import alignLeft from './icon/align-left.svg';
import alignHorizontally from './icon/align-horizontally.svg';
import alignRight from './icon/align-right.svg';
import alignTop from './icon/align-top.svg';
import alignVertically from './icon/align-vertically.svg';
import alignBottom from './icon/align-bottom.svg';
import rightStore from "../../../designer/right/RightStore";

/**
 * lc组件基础信息
 */
class BaseInfo extends Component<ConfigType> {

    schema: Control = {};

    state = {
        renderCount: 0
    }

    constructor(props: ConfigType) {
        super(props);
        const {controller} = this.props;
        const {name} = (controller.getConfig() as ComponentBaseProps).base!;
        this.schema = {
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
                            type: "input",
                            label: "宽度",
                            value: 0,
                            config: {
                                type: "number",
                            }
                        },
                        {
                            type: "input",
                            label: "高度",
                            value: 0,
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
                            type: "input",
                            label: "X轴",
                            value: 0,
                            config: {
                                type: "number",
                            }
                        },
                        {
                            type: "input",
                            label: "Y轴",
                            value: 0,
                            config: {
                                type: "number",
                            }
                        },
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        const {setBaseConfigRef} = rightStore;
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

    changeDesc = (value: string) => {
        const {controller} = this.props;
        controller.update({base: {desc: value}}, {reRender: false});
    }

    onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, schemaKeyPath, reRender} = fieldChangeData;
        if (id === "name") {
            this.changeName(data as string);
        } else {
            this.changeDesc(data as string);
        }
        LCGUIUtil.updateSchema(this.schema, schemaKeyPath, data);
        if (reRender)
            this.setState({renderCount: this.state.renderCount + 1});
    }

    render() {
        const {controller} = this.props;
        const {type} = (controller.getConfig() as ComponentBaseProps).base!;
        return (
            <div className={'base-info-config'}>
                <div className={'version-info'}>
                    <span><InfoCircleOutlined/> {type} | 版本: v1.0.0</span>
                </div>
                <LCGUI schema={this.schema} onFieldChange={this.onFieldChange}/>
                <UIContainer label={'对齐'} className={'base-info-align'}>
                    <div className={'align-item align-left'}><img alt={'align'} src={alignLeft}/></div>
                    <div className={'align-item align-horizontally'}><img alt={'align'} src={alignHorizontally}/></div>
                    <div className={'align-item align-right'}><img alt={'align'} src={alignRight}/></div>
                    <div className={'align-item align-top'}><img alt={'align'} src={alignTop}/></div>
                    <div className={'align-item align-vertically'}><img alt={'align'} src={alignVertically}/></div>
                    <div className={'align-item align-bottom'}><img alt={'align'} src={alignBottom}/></div>
                </UIContainer>
            </div>
        )
    }
}

export default BaseInfo;