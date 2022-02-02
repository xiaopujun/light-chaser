import React, {Component} from 'react';
import {Collapse, Select, Button, Switch} from "antd";
import EditTable from "../../edittable";


class ElemDataSet extends Component<any> {


    /**
     * 指向子组件引用
     */
    content: any = null;

    setContent = (obj: any) => {
        this.content = obj;
    }

    importData = () => {
        this.content && this.content?.visibleChanged();
    }


    render() {
        return (
            <div className={'elem-base-config'}>
                <Collapse className={'base-config-collapse'} bordered={false}>
                    <div>
                        <Button onClick={this.importData} type={'primary'}>点击录入数据</Button>
                        <EditTable {...this.props} mode={0} setContent={this.setContent}/>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default ElemDataSet;