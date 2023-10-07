import React from 'react';
import './Demo.less'
import {BluePrint} from "../blueprint/BluePrint";


class MyComponent extends React.Component {


    render() {
        return (
            <>
                {/*<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>*/}
                {/*    <LineCanvas/>*/}
                {/*</div>*/}
                {/*<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>*/}
                {/*    <BPMovable>*/}
                {/*        <Node icon={CodeSandboxOutlined} title={'测试节点'}*/}
                {/*              input={[*/}
                {/*                  {id: '1', title: '输入1', type: AnchorPointType.INPUT},*/}
                {/*                  {id: '2', title: '输入2', type: AnchorPointType.INPUT},*/}
                {/*                  {id: '3', title: '输入3', type: AnchorPointType.INPUT},*/}
                {/*              ]}*/}
                {/*              output={[*/}
                {/*                  {id: '4', title: '输出1', type: AnchorPointType.OUTPUT},*/}
                {/*                  {id: '5', title: '输出2', type: AnchorPointType.OUTPUT},*/}
                {/*              ]}*/}
                {/*        />*/}
                {/*    </BPMovable>*/}
                {/*</div>*/}
                <BluePrint/>
            </>
        )
    }

}

export default MyComponent;
