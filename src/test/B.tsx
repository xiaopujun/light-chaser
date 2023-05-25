import React, {Component} from 'react';
import demoStore from "./DemoStore";
import {observer} from "mobx-react";

class B extends Component {

    render() {
        console.log('B render');
        const {student, setStudent} = demoStore;
        return (
            <>
                <div>{student.name}</div>
                <button onClick={() => {
                    setStudent({
                        name: 'B'
                    });
                }}>Change Name
                </button>
            </>
        );
    }
}

export default observer(B);