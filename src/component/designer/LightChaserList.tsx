import React, {Component} from 'react';
import './style/LightChaserList.less';
import {Modal} from "antd";


class LightChaserList extends Component<any> {

    state: any = {
        addNewScreen: false
    }

    addNewBigScreen = () => {
        const {addNewScreen} = this.state;
        this.setState({addNewScreen: !addNewScreen})
    }

    addNewBigScreenOk = () => {

    }

    addNewBigScreenCancel = () => {
        const {addNewScreen} = this.state;
        this.setState({addNewScreen: !addNewScreen})
    }

    addNewDataSource = () => {
        alert("add new data source")
    }

    render() {
        const {addNewScreen} = this.state;
        let width = (window.innerWidth - 105 - (5 * 20)) / 5;
        let height = width * (9 / 16);
        return (
            <div className={'light-chaser-list'}>
                <div className={'lc-list-head'}>
                    <div className={'lc-list-head-title'}>LIGHT CHASER 数据大屏设计器</div>
                </div>
                <div className={'lc-list-statistics'}>
                    <div className={'lc-list-statistics-title'} style={{color: '#00fffb'}}>数据统计：</div>
                    <div className={'lc-list-statistics-items'}>
                        <div className={'lc-statistics-item lc-statistics-current-time'}
                             onClick={this.addNewDataSource}>
                            <label className={'lc-statistics-label lc-statistics-data'}>5</label>
                            <label className={'lc-statistics-label'}>数据源</label>
                        </div>
                        <div className={'lc-statistics-item'} onClick={this.addNewBigScreen}>
                            <label className={'lc-statistics-label lc-statistics-data'}>12</label>
                            <label className={'lc-statistics-label'}>大屏数</label>
                        </div>
                    </div>
                </div>
                <div className={'lc-list-content'}>
                    <div className={'lc-list-content-title'} style={{color: '#00fffb'}}>数据大屏：</div>
                    <div className={'lc-list-content-datas'}>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏1</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏2</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏3</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏4</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏5</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏6</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏7</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏8</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏9</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏10</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏11</div>
                        <div style={{width: width, height: height}} className={'lc-list-content-data'}>大屏12</div>
                    </div>
                </div>
                <Modal title="Basic Modal" visible={addNewScreen} onOk={this.addNewBigScreenOk}
                       onCancel={this.addNewBigScreenCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

export default LightChaserList;