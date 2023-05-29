import React, {Component} from 'react';
import demoStore from "./DemoStore";
import {observer} from "mobx-react";
import E from "./E";

class D extends Component {

    render() {
        const {students} = demoStore;

        return (
            <>
                <div data-type={students[0].name}>test</div>
                <E/>
            </>
        );
    }
}

export default observer(D);