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

    generateDataDialog = () => {
        const {dataXDesigner} = this.props;
        const {active} = dataXDesigner;
        switch (active.subType) {
            case "AntdBaseBar":
                return <EditTable {...this.props} mode={0} setContent={this.setContent}/>;
            case "AntdGroupBar":
            case "AntdPercentBar":
                return <EditTable {...this.props} mode={1} setContent={this.setContent}/>;
            case "AntdZoneBar":
                return <EditTable {...this.props} mode={2} setContent={this.setContent}/>;

        }
    }


    render() {
        return (
            <div className={'elem-base-config'}>
                <Collapse className={'base-config-collapse'} bordered={false}>
                    <div>
                        <Button onClick={this.importData} type={'primary'}>点击录入数据</Button>
                        {this.generateDataDialog()}
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default ElemDataSet;