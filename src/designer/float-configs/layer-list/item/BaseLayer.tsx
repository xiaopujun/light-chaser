import React, {MouseEvent} from "react";
import layerListStore from "../LayerListStore";

export interface LayerProps {
    compId?: string;
    name?: string;
    lock?: boolean;
    hide?: boolean;
    selected?: boolean;
}

export abstract class BaseLayer extends React.PureComponent<LayerProps, LayerProps & { showContent?: boolean }> {
    constructor(props: LayerProps) {
        super(props);
        this.state = {...props}
    }

    toggleLock = (event: MouseEvent) => {
        event.stopPropagation();
        const {lockChange} = layerListStore;
        lockChange && lockChange(this.state.compId!, !this.state.lock);
    }

    toggleHide = (event: MouseEvent) => {
        event.stopPropagation();
        const {hideChange} = layerListStore;
        hideChange && hideChange(this.state.compId!, !this.state.hide);
    }

    onSelected = (event: MouseEvent<HTMLDivElement>) => {
        const {hide, compId} = this.state;
        if (hide) return;
        event.stopPropagation();
        const {selectedChange} = layerListStore;
        selectedChange && selectedChange(compId!, event);
    }
}