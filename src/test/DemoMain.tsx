import React from 'react';
import './Demo.less'
import {Node} from "../blueprint/node/Node";
import {CodeSandboxOutlined} from "@ant-design/icons";
import {AnchorPointType} from "../blueprint/node/AnchorPoint";


type Coordinate = [number, number];

class MyComponent extends React.Component {


    render() {
        return (
            <div style={{position: "relative"}}>
                <Node icon={CodeSandboxOutlined} title={'测试节点'}
                      input={[
                          {id: '1', title: '输入1', type: AnchorPointType.INPUT},
                          {id: '2', title: '输入2', type: AnchorPointType.INPUT},
                          {id: '3', title: '输入3', type: AnchorPointType.INPUT},
                      ]}
                      output={[
                          {id: '4', title: '输出1', type: AnchorPointType.OUTPUT},
                          {id: '5', title: '输出2', type: AnchorPointType.OUTPUT},
                      ]}
                />
            </div>
        )
    }

}

export default MyComponent;
