import React, {MouseEvent} from "react";
import layerListStore from "../LayerListStore";
import designerStore from "../../../store/DesignerStore";
import contextMenuStore from "../../../operate-provider/right-click-menu/ContextMenuStore";

export interface LayerProps {
    compId?: string;
    name?: string;
    lock?: boolean;
    hide?: boolean;
    selected?: boolean;
    inputMode?: boolean;
}

export abstract class BaseLayer extends React.PureComponent<LayerProps, LayerProps & { showContent?: boolean }> {

    layerName: string = '';

    constructor(props: LayerProps) {
        super(props);
        this.state = {...props};
        this.layerName = props.name || '';
    }

    /**
     * 由于图层列表的操作事件阻止了冒泡，因此通过本方法单独判断是否需要关闭图层列表上打开的右键菜单
     */
    closeContextMenu = () => {
        const {visible, updateVisible} = contextMenuStore;
        if (visible)
            updateVisible(false);
    }

    toggleLock = (event: MouseEvent) => {
        event.stopPropagation();
        const {lockChange} = layerListStore;
        lockChange && lockChange(this.state.compId!, !this.state.lock);
        this.closeContextMenu();
    }

    toggleHide = (event: MouseEvent) => {
        event.stopPropagation();
        const {hideChange} = layerListStore;
        hideChange && hideChange(this.state.compId!, !this.state.hide);
        this.closeContextMenu();
    }

    onSelected = (event: MouseEvent<HTMLDivElement>) => {
        const {hide, compId} = this.state;
        if (hide) return;
        event.stopPropagation();
        const {selectedChange} = layerListStore;
        selectedChange && selectedChange(compId!, event);
        this.closeContextMenu();
    }

    openInput = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const {inputMode} = this.state;
        if (!inputMode)
            this.setState({inputMode: true});
        this.closeContextMenu();
    }

    closeInput = () => {
        const {inputMode, compId, name} = this.state;
        if (inputMode && name !== this.layerName) {
            const {updateLayer, compInstances} = designerStore;
            updateLayer([{id: compId!, name: this.layerName}], false);
            const compInstance = compInstances[compId!];
            compInstance && compInstance.update({info: {name: this.layerName}});
            this.setState({inputMode: false, name: this.layerName});
        } else {
            this.setState({inputMode: false});
        }
    }

    changeLayerName = (name: string | number) => this.layerName = name as string;
}