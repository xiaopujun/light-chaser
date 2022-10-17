import React, {Component} from 'react';
import '../designer/style/LightChaserList.less';
import {withRouter} from "react-router-dom";
import AddNewScreenDialog from "./AddNewScreenDialog";


class LightChaserList extends Component<any> {

    state: any = {
        addNewScreen: false,
        addNewData: {}
    }

    addNewBigScreen = () => {
        const {addNewScreen} = this.state;
        this.setState({addNewScreen: !addNewScreen})
    }

    addNewBigScreenOk = () => {
        const {addNewData} = this.state;
        this.props.history.push('/designer', {...addNewData, action: 'add'});
    }

    addNewBigScreenCancel = () => {
        const {addNewScreen} = this.state;
        this.setState({addNewScreen: !addNewScreen, addNewData: {}})
    }

    addNewDataSource = () => {
        alert("add new data source")
    }

    addNewScreenDialogChanged = (data: { [k: string]: [v: any] }) => {
        const {addNewData} = this.state;
        this.setState({addNewData: {...addNewData, ...data}});
    }

    openScreen = (e: any) => {
        this.props.history.push('/designer', {id: parseInt(e.target.id), action: 'update'});
    }

    render() {
        const {addNewScreen} = this.state;
        let width = (window.innerWidth - 105 - (5 * 20)) / 5;
        let height = width * (9 / 16);
        //获取本地数据
        const lightChaser = JSON.parse(window.localStorage.lightChaser || '[]');
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
                        {lightChaser && lightChaser.map((item: any) => {
                            return (
                                <div key={item.id + ''} style={{width: width, height: height}} onClick={this.openScreen}
                                     id={item.id + ''}
                                     className={'lc-list-content-data'}>{item.screenName}</div>
                            )
                        })}
                    </div>
                </div>
                <AddNewScreenDialog onOk={this.addNewBigScreenOk} onCancel={this.addNewBigScreenCancel}
                                    visible={addNewScreen} onChange={this.addNewScreenDialogChanged}/>
            </div>
        );
    }
}

export default withRouter(LightChaserList);