import React, {Component, ReactDOM} from 'react';
import './index.less';


interface ToolItemProp {
    id: string;
    sort: string;
    data: Array<{
        id: string;
        icon: ReactDOM;
        content: string;
        token: string;
    }>;
}

export default class ToolItem extends Component<ToolItemProp> {
    render() {
        const {id, sort, data} = this.props;
        return (
            <div className={'item-group'} key={id + ''}>
                <div className={'group-title'}>{sort}</div>
                <div className={'group-line'}/>
                <div className={'chart-button'}>
                    {data.map((item) => {
                        return (
                            <button key={item.id} onDragStart={(e) => {
                                e.dataTransfer.setData('chartName', item?.token || '')
                            }} className="droppable-element tool-item" draggable={true}>
                                <div className={'item-layout'}>
                                    <div>{item.icon}</div>
                                    <div>{item.content}</div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        );
    }
}
