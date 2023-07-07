import React, {Component} from 'react';
import SortList from "./classify-list/ClassifyList";
import {observer} from "mobx-react";

class DesignerLeft extends Component {

    render() {
        return (
            <SortList/>
        );
    }
}

export default observer(DesignerLeft);