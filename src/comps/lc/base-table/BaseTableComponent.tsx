import {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";
import './BaseTableComponent.less';

export interface ITableColumn {
    key: string;
    label: string;
    width?: number;
    align?: 'left' | 'center' | 'right';
}

export interface ITableHeaderStyle {
    height?: number;
    background?: string;
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
}

export enum CarouselMode {
    //逐条
    ABA,
    //逐页
    PBP,
    //平滑连续
    SAC,
}

export interface ITableBodyStyle {
    background?: string;
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
    enableZebra?: boolean;
    zebraColor?: string;
    enableCarousel?: boolean;
    carouselMode?: CarouselMode;
    carouselSpeed?: number;
}

export interface BaseTableComponentStyle {
    columns?: ITableColumn[];
    data?: object[];
    header?: ITableHeaderStyle;
    body?: ITableBodyStyle;
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
        const {style: {columns, data, header, body}} = this.state;
        console.log(data)
        return (
            <div className={'base-table'}>
                <table>
                    <thead style={{...header}}>
                    <tr>
                        {columns && columns.map((column: ITableColumn, index: number) => {
                            return <th key={index}
                                       style={{width: column.width, fontWeight: header.fontWeight}}>{column.label}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody style={{...body}}>
                    {
                        data && data.map((item: any, index: number) => {
                            return (
                                <tr key={index}>
                                    {columns && columns.map((column: ITableColumn, i: number) => {
                                        return <td key={i}>{item[column.key]}</td>
                                    })}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BaseTableComponent;