import {Component} from 'react';
import './BaseInfo.less';
import {ConfigType} from "../../../designer/right/ConfigType";
import designerStore from "../../../designer/store/DesignerStore";
import layerListStore from "../../../designer/float-configs/layer-list/LayerListStore";
import {ComponentBaseProps} from "../common-types";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import LCGUIUtil from "../../../json-schema/LCGUIUtil";

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
        const {type, name, desc} = (controller.getConfig() as ComponentBaseProps).info!;
        this.schema = {
            type: 'grid',
            children: [
                {
                    id: "name",
                    key: "name",
                    label: "名称",
                    type: "input",
                    value: name
                },
                {
                    key: "desc",
                    label: "描述",
                    type: "input",
                    value: desc
                },
                {
                    key: "type",
                    label: "类型",
                    type: "input",
                    value: type,
                    config: {
                        disabled: true
                    }
                },
            ]
        }
    }


    changeName = (value: string) => {
        const {controller} = this.props;
        controller.update({info: {name: value}}, {reRender: false});
        const {updateLayout} = designerStore;
        const id = controller.getConfig().info.id;
        updateLayout && updateLayout([{id, name: value}]);
        //如果显示图层,则更新图层名称
        const {layerInstances} = layerListStore;
        let layerInstance = layerInstances[id];
        layerInstance && (layerInstance as Component).setState({name: value});
    }

    changeDesc = (value: string) => {
        const {controller} = this.props;
        controller.update({info: {desc: value}}, {reRender: false});
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
        return (
            <LCGUI schema={this.schema} onFieldChange={this.onFieldChange}/>
        )
    }
}

export default BaseInfo;