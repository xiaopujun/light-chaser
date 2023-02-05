import React, {Component} from 'react';
import {observer} from "mobx-react";
import lcRightMenuStore from "./store/LcRightMenuStore";

class LcRightMenu extends Component {
    render() {
        const {visible, position = [0, 0]} = lcRightMenuStore;
        return (
            <>
                {visible &&
                <div style={{
                    width: 200,
                    height: 300,
                    backgroundColor: "#009cff",
                    position: 'fixed',
                    top: position[1],
                    left: position[0]
                }}>
                    custom right menu
                </div>}
            </>
        );
    }
}

export default observer(LcRightMenu);