import React, {Component} from 'react';
import './classify-list/ClassifyList.less';
import SortList from "./classify-list/ClassifyList";
import CompList from "./comp-list/CompList";

class DesignerLeft extends Component {

    render() {
        return (
            <>
                <SortList/>
                <CompList/>
            </>
        );
    }
}

export default DesignerLeft;