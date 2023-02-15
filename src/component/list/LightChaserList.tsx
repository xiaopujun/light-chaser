import React, {Component} from 'react';
import '../designer/style/LightChaserList.less';
import {RouteComponentProps, withRouter} from "react-router-dom";
import AddNewScreenDialog from "./AddNewScreenDialog";
import {localGetAll} from "../../local/LocalStorageUtil";

interface LightChaserListProps extends RouteComponentProps {

}

class LightChaserList extends Component<LightChaserListProps> {

    state: any = {
        addNewScreen: false,
        addNewData: {},
        data: [],
    }

    componentDidMount() {
        localGetAll().then((data: any) => {
            if (data && data.length > 0) {
                this.setState({data})
            }
        })
    }

    addNewBigScreen = () => {
        const {addNewScreen} = this.state;
        this.setState({addNewScreen: !addNewScreen})
    }

    addNewBigScreenOk = () => {
        const {addNewData} = this.state;
        this.props.history.push('/designer', {...addNewData, action: 'create'});
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
        this.props.history.push('/designer', {id: parseInt(e.target.id), action: 'edit'});
    }

    render() {
        const {addNewScreen, data} = this.state;
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
                        {data && data.map((item: any) => {
                            return (
                                <div key={item.id + ''} style={{width: width, height: height}} onClick={this.openScreen}
                                     id={item.id + ''}
                                     className={'lc-list-content-data'}>{item.projectConfig?.screenName}</div>
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