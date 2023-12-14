import {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";
import './BaseTableComponent.less';

export interface BaseTableComponentStyle {

}

export interface BaseTableComponentProps extends ComponentBaseProps {
    style?: BaseTableComponentStyle;
}

class BaseTableComponent extends Component<BaseTableComponentProps, BaseTableComponentProps> {

    constructor(props: BaseTableComponentProps) {
        super(props);
        this.state = {...props};
    }

    render() {
        return (
            <div className={'base-table'}>
                <table>
                    <thead>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>性别</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>张三</td>
                        <td>18</td>
                        <td>男</td>
                    </tr>
                    <tr>
                        <td>李四</td>
                        <td>20</td>
                        <td>女</td>
                    </tr>
                    <tr>
                        <td>王五</td>
                        <td>22</td>
                        <td>男</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BaseTableComponent;