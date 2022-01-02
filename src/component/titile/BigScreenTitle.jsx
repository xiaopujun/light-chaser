import React, { Component } from 'react';
import { Decoration1, Decoration10, Decoration7 } from '@jiaminghi/data-view-react';
import {dataTimeFormat} from '../../utils/DateUtil';
import './BigScreenTitle.less';

export default class BigScreenTitle extends Component {
    state = {
        currentTime: ''
    }

    componentDidMount() {
        setInterval(() => {
            const currentTime = dataTimeFormat(new Date(), "yyyy年MM月dd日 hh时mm分ss秒");
            this.setState({ currentTime });
        }, 1000);
    }

    render() {
        const { currentTime } = this.state;
        return (
            <>
                <div className="title-grid big-screen-title">
                    <div className={'big-screen-title-time'}>{currentTime}</div>
                    <div><Decoration1 style={{ width: '200px', height: '50px' }} /></div>
                    <div className={'big-screen-title-content'}><Decoration7 style={{ width: '267px', height: '60px' }} >智慧农业传感网监控</Decoration7></div>
                    <div><Decoration1 style={{ width: '200px', height: '50px' }} /></div>
                    <div className={'big-screen-title-info'}>地理位置：重庆  天气：多云</div>
                </div>
                <Decoration10 style={{ width: '100%', height: '1px' }} />
            </>
        )
    }
}
