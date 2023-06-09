import * as React from "react";
import Moveable from "react-moveable";
import {observer} from "mobx-react";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import designerStore from "../../designer/store/DesignerStore";

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

    render() {
        const {scale, selectorRef, targets} = eventOperateStore;
        const {updateLayout} = designerStore;
        return (
            <>
                {this.props.children}
                <Moveable ref={this.movableRef}
                          zoom={scale}
                          draggable={true}
                          resizable={true}
                          throttleDrag={50}
                          target={targets}
                          onClickGroup={e => {
                              (selectorRef.current as any)?.clickTarget(e.inputEvent, e.inputTarget);
                          }}
                          onDrag={({target, beforeTranslate}) => {
                              target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                          }}
                          onDragEnd={(e: any) => {
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
                                  console.log("onDragEnd", target.id, beforeTranslate[0], beforeTranslate[1]);
                              }
                          }}
                          onResize={({target, width, height, drag}) => {
                              target.style.width = `${width}px`;
                              target.style.height = `${height}px`;
                              target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
                          }}
                          onDragGroup={e => {
                              e.events.forEach(ev => {
                                  ev.target.style.transform = ev.transform;
                              });
                          }}
                />
            </>
        );
    }
}

export default observer(GroupMovable);