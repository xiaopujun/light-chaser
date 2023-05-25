import React, {Component} from 'react';
import demoStore from "./DemoStore";
import {observer} from "mobx-react";

class C extends Component {

    render() {
        console.log('C render');
        const {students} = demoStore;
        return (
            <>
                <div>{JSON.stringify(students)}</div>
            </>
        );
    }
}

export default observer(C);