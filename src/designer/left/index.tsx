import {Component} from 'react';
import ClassifyList from "./classify-list/ClassifyList";
import {observer} from "mobx-react";

class DesignerLeft extends Component {

    render() {
        return (
            <ClassifyList/>
        );
    }
}

export default observer(DesignerLeft);