import React, {PureComponent} from 'react';
import Moveable from "react-moveable";
import {observer} from "mobx-react";
import movableStore from "./MovableStore";

interface MovableItemProps {
    data?: MovableItemData;
    onDragEnd?: (data: MovableItemData) => void;
    onResizeEnd?: (data: MovableItemData) => void;
}

export interface MovableItemData {
    width: number;
    height: number;
    position: [number, number];
    id: string | undefined;
    type: string | undefined;
}

class MovableItem extends PureComponent<MovableItemProps> {

    //可拖拽的目标元素
    target: any;
    data: MovableItemData = {
        width: 384,
        height: 216,
        position: [0, 0],
        id: undefined,
        type: undefined
    }

    constructor(props: MovableItemProps) {
        super(props);
        const {data} = props;
        if (data) this.data = {...data};
    }

    componentDidMount() {
        if (this.target)
            this.setState({load: true})
    }

    render() {
        const {onDragEnd, onResizeEnd} = this.props;
        const {activeMovableItemId} = movableStore;
        console.log('MovableItem render', activeMovableItemId);
        return (
            <>
                <div ref={ref => this.target = ref} id={this.data.id} data-type={this.data.type}
                     className="lc-movable-item"
                     style={{
                         width: this.data.width,
                         height: this.data.height,
                         transform: `translate(${this.data.position[0]}px, ${this.data.position[1]}px)`,
                         position: 'absolute'
                     }}>
                    {this.props.children}
                </div>
                {activeMovableItemId === this.data.id && <Moveable
                    target={this.target}
                    pinchable={true}
                    draggable={true}
                    resizable={true}
                    snappable={true}
                    isDisplayGridGuidelines={true}
                    snapGap={true}
                    snapGridWidth={10}
                    throttleDrag={10}
                    throttleResize={10}
                    onDragEnd={() => onDragEnd && onDragEnd(this.data)}
                    onDrag={({target, beforeTranslate}) => {
                        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                        this.data.position[0] = beforeTranslate[0];
                        this.data.position[1] = beforeTranslate[1];
                    }}
                    onResizeEnd={() => onResizeEnd && onResizeEnd(this.data)}
                    onResize={({target, width, height, drag}) => {
                        console.log('onResize', width, height, drag.beforeTranslate)
                        target.style.width = `${width}px`;
                        target.style.height = `${height}px`;
                        target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
                        this.data.width = width;
                        this.data.height = height;
                        this.data.position[0] = drag.beforeTranslate[0];
                        this.data.position[1] = drag.beforeTranslate[1];
                    }}
                />}
            </>
        );
    }
}

export default observer(MovableItem);