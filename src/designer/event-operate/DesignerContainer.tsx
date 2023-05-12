import React, {Component} from 'react';
import shortcutKey from "./ShortcutKey";
import scaleCore from "../../framework/scale/ScaleCore";
import eventManager from "../../framework/event/EventManager";

class DesignerContainer extends Component {

    componentDidMount() {
        document.addEventListener("click", (event: any) => {
            eventManager.emit('click', event);
        });
        document.addEventListener("contextmenu", (event: any) => {
            eventManager.emit('contextmenu', event);
        });
        document.addEventListener('keyup', ev => {
            eventManager.emit('keyup', ev);
        })
        document.addEventListener('keydown', ev => {
            eventManager.emit('keydown', ev);
        })
        document.addEventListener('wheel', e => {
            if (shortcutKey._space) {
                let type = 1;
                if (e.deltaY > 0)
                    type = 0;
                scaleCore.compute(type);
                eventManager.emit('wheel', e);
            }
        });
        document.addEventListener('mousemove', e => {
            eventManager.emit('mousemove', e);
        });
        document.addEventListener('mousedown', e => {
            eventManager.emit('mousedown', e);
        });
        document.addEventListener('mouseup', e => {
            eventManager.emit('mouseup', e);
        });

    }

    render() {
        return (
            <div className={'lc-event-container'}>
                {this.props.children}
            </div>
        );
    }
}

export default DesignerContainer;