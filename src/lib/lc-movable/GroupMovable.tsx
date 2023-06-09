import * as React from "react";
import Moveable from "react-moveable";
import {observer} from "mobx-react";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import designerStore from "../../designer/store/DesignerStore";
import {MovableItemData} from "./types";

class GroupMovable extends React.Component {
    movableRef = React.createRef<Moveable>();

    constructor(props: any) {
        super(props);
        this.state = {
            targets: [],
        };
    }

    componentDidMount() {
        const {setMovableRef} = eventOperateStore;
        setMovableRef(this.movableRef);
    }

    onDragEnd = (e: any) => {
        const {updateLayout} = designerStore;
        const {lastEvent, target} = e;
        if (lastEvent) {
            const {beforeTranslate} = lastEvent;
            updateLayout([
                {
                    id: target.id,
                    width: target.offsetWidth,
                    height: target.offsetHeight,
                    type: target.dataset.type,
                    position: [beforeTranslate[0], beforeTranslate[1]]
                }
            ]);
        }
    }

    onDragGroupEnd = (e: any) => {
        const {updateLayout} = designerStore;
        let data: MovableItemData[] = [];
        e.events.forEach((ev: any) => {
            const {target, lastEvent} = ev;
            if (lastEvent) {
                const {beforeTranslate} = lastEvent;
                data.push({
                    id: target.id,
                    width: target.offsetWidth,
                    height: target.offsetHeight,
                    type: target.dataset.type,
                    position: [beforeTranslate[0], beforeTranslate[1]]
                })
            }
        })
        if (data.length > 0)
            updateLayout(data);
    }

    onResizeEnd = (e: any) => {
        const {updateLayout} = designerStore;
        const {target, lastEvent} = e;
        if (lastEvent) {
            const {width, height, drag: {translate}} = lastEvent;
            updateLayout([
                {
                    id: target.id,
                    width: width,
                    height: height,
                    type: target.dataset.type,
                    position: [translate[0], translate[1]]
                }
            ])
        }
    }

    onResizeGroupEnd = (e: any) => {
        const {updateLayout} = designerStore;
        let data: MovableItemData[] = [];
        e.events.forEach((ev: any) => {
            const {target, lastEvent} = ev;
            if (lastEvent) {
                const {drag: {translate}} = lastEvent;
                data.push({
                    id: target.id,
                    width: target.offsetWidth,
                    height: target.offsetHeight,
                    type: target.dataset.type,
                    position: [translate[0], translate[1]]
                })
            }
        })
        if (data.length > 0)
            updateLayout(data);
    }


    render() {
        const {scale, selectorRef, targets} = eventOperateStore;
        return (
            <>
                {this.props.children}
                <Moveable ref={this.movableRef}
                          target={targets}
                          zoom={scale}
                          scalable={true}
                          keepRatio={false}
                          throttleScale={0}
                          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                          onScale={e => {
                              e.target.style.transform = e.drag.transform;
                          }}
                          draggable={true}
                          resizable={true}
                          throttleDrag={50}
                          onClickGroup={e => {
                              (selectorRef.current as any)?.clickTarget(e.inputEvent, e.inputTarget);
                          }}
                          onDrag={({target, beforeTranslate}) => {
                              target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                          }}
                          onDragEnd={this.onDragEnd}
                          onDragGroup={e => {
                              e.events.forEach(ev => {
                                  ev.target.style.transform = ev.transform;
                              });
                          }}
                          onDragGroupEnd={this.onDragGroupEnd}
                          onResize={({target, width, height, drag}) => {
                              target.style.width = `${width}px`;
                              target.style.height = `${height}px`;
                              target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
                          }}
                          onResizeEnd={this.onResizeEnd}
                          onResizeGroupEnd={this.onResizeGroupEnd}
                          onResizeGroup={({events}) => {
                              events.forEach(ev => {
                                  ev.target.style.width = `${ev.width}px`;
                                  ev.target.style.height = `${ev.height}px`;
                                  ev.target.style.transform = ev.drag.transform;
                              })
                          }}
                />
            </>
        );
    }
}

export default observer(GroupMovable);