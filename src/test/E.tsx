import React, {Component} from 'react';
import demoStore from "./DemoStore";
import {observer} from "mobx-react";

class E extends Component {

    render() {
        console.log('E render');
        const {students} = demoStore;
        return (
            <>
                <div>{JSON.stringify(students)}</div>
            </>
        );
    }
}

export default observer(E);