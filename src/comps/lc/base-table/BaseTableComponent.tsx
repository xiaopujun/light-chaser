import {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";
import './BaseTableComponent.less';
import {debounce} from "lodash";

export interface ITableColumn {
    key: string;
    label: string;
    width?: number;
    textAlign?: 'left' | 'center' | 'right';
}

export interface ITableHeaderStyle {
    height?: number;
    background?: string;
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
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
    carouselSpeed?: number;
    pageSize?: number;
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

    tableRef: HTMLDivElement | null = null;
    theadRef: HTMLElement | null = null;
    tbodyRef1: HTMLElement | null = null;
    tbodyRef2: HTMLElement | null = null;
    resizeObserver: ResizeObserver | null = null;
    contentHeight: number | null = null;

    constructor(props: BaseTableComponentProps) {
        super(props);
        this.state = {...props};
    }

    componentDidMount() {
        if (this.tableRef) {
            this.contentHeight = this.tableRef.clientHeight - this.theadRef!.clientHeight;
            this.resizeObserver = new ResizeObserver(debounce((entries) => {
                for (let entry of entries) {
                    const {height} = entry.contentRect;
                    this.contentHeight = height - this.theadRef!.clientHeight;
                    this.tbodyRef1 && (this.tbodyRef1.style.height = `${this.contentHeight}px`);
                    this.tbodyRef2 && (this.tbodyRef2.style.height = `${this.contentHeight}px`);
                }
                this.changeTableTrHeight();
            }, 100));
            // 开始观察
            this.resizeObserver.observe(this.tableRef);
            this.changeTableTrHeight();
        }
    }

    componentWillUnmount() {
        this.tableRef && (this.tableRef = null);
        this.theadRef && (this.theadRef = null);
        this.tbodyRef1 && (this.tbodyRef1 = null);
        this.tbodyRef2 && (this.tbodyRef2 = null);
        this.resizeObserver && this.resizeObserver.disconnect();
    }

    changeTableTrHeight = () => {
        const {pageSize = 0} = this.state.style!.body!;
        if (pageSize) {
            const tableBodyTds = this.tableRef?.getElementsByClassName('base-table-tr') || [];
            console.log(tableBodyTds)
            const tdHeight = this.contentHeight! / pageSize;
            for (let i = 0; i < tableBodyTds.length; i++) {
                (tableBodyTds[i] as HTMLElement).style.height = `${tdHeight}px`;
            }
        }
    }

    render() {
        const {columns, data, header, body} = this.state.style!;
        const {enableCarousel, carouselSpeed = 3, pageSize, ...bodyStyle} = body as ITableBodyStyle;
        const carouselStyle = enableCarousel ? `scroll ${carouselSpeed}s linear infinite` : `none`;
        if (pageSize)
            this.changeTableTrHeight();
        return (
            <div className={'base-table'} ref={ref => this.tableRef = ref}>
                <table>
                    <thead style={{...header}} ref={ref => this.theadRef = ref}>
                    <tr>
                        {columns && columns.map((column: ITableColumn, index: number) => {
                            return <th key={index}
                                       style={{
                                           width: column.width,
                                           fontWeight: header?.fontWeight,
                                           textAlign: column.textAlign
                                       }}>{column.label}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody style={{...bodyStyle, animation: carouselStyle}}
                           className="scroll-body" ref={ref => this.tbodyRef1 = ref}>
                    {
                        data && data.map((item: any, index: number) => {
                            return (
                                <tr key={index} className={'base-table-tr'}>
                                    {columns && columns.map((column: ITableColumn, i: number) => {
                                        return <td key={i}
                                                   style={{
                                                       textAlign: column.textAlign
                                                   }}>{item[column.key]}</td>
                                    })}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    <tbody style={{...bodyStyle, animation: carouselStyle}} className="scroll-body"
                           ref={ref => this.tbodyRef2 = ref}>
                    {
                        data && data.map((item: any, index: number) => {
                            return (
                                <tr key={index} className={'base-table-tr'}>
                                    {columns && columns.map((column: ITableColumn, i: number) => {
                                        return <td key={i}
                                                   style={{
                                                       textAlign: column.textAlign
                                                   }}>{item[column.key]}</td>
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