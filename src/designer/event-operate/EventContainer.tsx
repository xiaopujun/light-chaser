import React, {Component} from 'react';
import shortcutKey from "./ShortcutKey";
import lcRightMenuStore from "../store/LcRightMenuStore";

class EventContainer extends Component {

    componentDidMount() {
        const {setPosition, setTargetId, updateVisible} = lcRightMenuStore;
        document.addEventListener("click", (event: any) => {
                const {visible, updateVisible} = lcRightMenuStore;
                if (visible && event.button === 0)
                    updateVisible(false);
            }
        );

        document.addEventListener("contextmenu", (event: any) => {
            event.preventDefault();
            if (event.target.className.indexOf('react-grid-item') > -1) {
                updateVisible && updateVisible(true);
                setPosition([event.clientX, event.clientY]);
                setTargetId && setTargetId(parseInt(event.target.id));
            } else {
                updateVisible && updateVisible(false);
            }
        });

        document.addEventListener('keyup', ev => {
            if (ev.keyCode === 32)
                shortcutKey._space = false;
        })

        document.addEventListener('keydown', ev => {
            if (ev.keyCode === 32)
                shortcutKey._space = true;
        })
    }

    render() {
        return (
            <div className={'lc-event-container'}>
                {this.props.children}
            </div>
        );
    }
}

export default EventContainer;