/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import './BaseTableComponent.less';
import debounce from "lodash/debounce";

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

export interface BaseTableComponentRef {
    updateConfig: (newConfig: BaseTableComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
    destroy: () => void;
}

const BaseTableComponent = forwardRef((props: BaseTableComponentProps, ref: ForwardedRef<BaseTableComponentRef>) => {
    const [config, setConfig] = useState<BaseTableComponentProps>({...props});
    const tableRef = useRef<HTMLDivElement | null>(null);
    const theadRef = useRef<HTMLTableSectionElement | null>(null);
    const tbodyRef1 = useRef<HTMLTableSectionElement | null>(null);
    const tbodyRef2 = useRef<HTMLTableSectionElement | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const eventHandlerMap = useRef<Record<string, Function>>({});
    const contentHeightRef = useRef(0);

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
        destroy: destroy
    }));

    const onClick = () => {
        if ('click' in eventHandlerMap.current) {
            eventHandlerMap.current['click']();
        }
    }

    const destroy = () => {
        tableRef && (tableRef.current = null);
        theadRef && (theadRef.current = null);
        tbodyRef1 && (tbodyRef1.current = null);
        tbodyRef2 && (tbodyRef2.current = null);
        resizeObserverRef && resizeObserverRef.current?.disconnect();
        resizeObserverRef.current = null;
    }

    const changeTableTrHeight = () => {
        const {pageSize = 0} = config.style!.body!;
        if (pageSize) {
            const tableBodyTds = tableRef.current?.getElementsByClassName('base-table-tr') || [];
            const tdHeight = contentHeightRef.current! / pageSize;
            for (let i = 0; i < tableBodyTds.length; i++) {
                (tableBodyTds[i] as HTMLElement).style.height = `${tdHeight}px`;
            }
        }
    }

    useEffect(() => {
        if (tableRef.current) {
            contentHeightRef.current = tableRef.current.clientHeight - theadRef.current!.clientHeight;
            resizeObserverRef.current = new ResizeObserver(debounce((entries) => {
                for (const entry of entries) {
                    const {height} = entry.contentRect;
                    contentHeightRef.current = height - theadRef.current!.clientHeight;
                    tbodyRef1.current && (tbodyRef1.current.style.height = `${contentHeightRef.current}px`);
                    tbodyRef2.current && (tbodyRef2.current.style.height = `${contentHeightRef.current}px`);
                }
                changeTableTrHeight();
            }, 100));
            // 开始观察
            resizeObserverRef.current!.observe(tableRef.current);
            changeTableTrHeight();
        }
    }, []);


    const {columns, data, header, body} = config.style!;
    const {enableCarousel, carouselSpeed = 3, pageSize, ...bodyStyle} = body as ITableBodyStyle;
    const carouselStyle = enableCarousel ? `scroll ${carouselSpeed}s linear infinite` : `none`;
    if (pageSize)
        changeTableTrHeight();
    return (
        <div className={'base-table'} ref={tableRef} onClick={onClick}>
            <table>
                <thead style={{...header}} ref={theadRef}>
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
                       className="scroll-body" ref={tbodyRef1}>
                {
                    data && data.map((item: Record<string, any>, index: number) => {
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
                       ref={tbodyRef2}>
                {
                    data && data.map((item: Record<string, any>, index: number) => {
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
})

export default BaseTableComponent;