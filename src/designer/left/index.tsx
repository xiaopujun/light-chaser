import React, {Component} from 'react';
import '../style/LcDesignerLeft.less';
import SortList from "./classify-list/ClassifyList";
import CompList from "./comp-list/CompList";

class Index extends Component {

    render() {
        return (
            <>
                <SortList/>
                <CompList/>
            </>
        );
    }
}

export default Index;