import React, {Component} from 'react';
import {observer} from "mobx-react";
import CompList from "./comp-list/CompList";
import compListStore from "./comp-list/CompListStore";

class FloatConfigs extends Component {
    render() {
        const {visible} = compListStore;
        return (
            <>
                {visible && <CompList/>}
            </>
        );
    }
}

export default observer(FloatConfigs);