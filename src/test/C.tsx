import React, {Component} from 'react';
import {observer} from "mobx-react";
import D from "./D";
import _, {PropertyName} from "lodash";

class C extends Component {

    customizer = (value: any, other: any, indexOrKey: PropertyName | undefined, parent: any, otherParent: any, stack: any) => {
        // 忽略属性名为 'ignoredProp' 的属性
        if (indexOrKey === 'ignoredProp') {
            return undefined;
        }// 默认的比较逻辑
        return undefined;
    }

    render() {
        console.log('C render');
        return (
            <>
                <button onClick={() => {
                    console.log('lodash', _.isEqual(_.omit({name: 'a', age: 1}, ['name']),
                        _.omit({name: 'b', age: 1}, ['name'])));
                }}>测试loadsh
                </button>
                <D/>
            </>
        );
    }
}

export default observer(C);