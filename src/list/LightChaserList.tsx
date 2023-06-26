import React, {Component} from 'react';
import './style/LightChaserList.less';
import {RouteComponentProps, withRouter} from "react-router-dom";
import AddNewScreenDialog from "./AddNewScreenDialog";
import {getAllProject, getImageFromLocalWithKey} from "../utils/LocalStorageUtil";
import listBottom from './icon/list-bottom.svg';
import templateMarket from './icon/template-market.svg';
import datasource from './icon/datasource.svg';
import LcButton from "../lib/lc-button/LcButton";

interface LightChaserListProps extends RouteComponentProps {

}

class LightChaserList extends Component<LightChaserListProps> {

    state: any = {
        addNewScreen: false,
        addNewData: {},
        data: [],
        imageIdToUrl: {}
    }

    componentDidMount() {
        getAllProject().then((data: any) => {
            if (data && data.length > 0) {
                this.setState({data});
                let imageIds: any = [];
                data.forEach((item: any) => {
                    let imageId = item.projectConfig.screenshot;
                    if (imageId && imageId !== '') {
                        imageIds.push(imageId);
                    }
                });
                const promise = imageIds.map((imageId: any) => getImageFromLocalWithKey(imageId));
                let imageIdToUrl: any = {};
                Promise.all(promise).then((res: any) => {
                    res.forEach((item: any) => {
                        const key = Object.keys(item)[0];
                        imageIdToUrl[key] = item[key];
                    });
                    this.setState({imageIdToUrl});
                });

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
        const {addNewScreen, data, imageIdToUrl} = this.state;
        let width = (window.innerWidth - 230 - (6 * 20)) / 6;
        let height = width * (9 / 16);
        return (
            <div className={'lc-console'}>
                <div className={'console-head'}>
                    <div className={'console-head-title'}>LC 控制台</div>
                </div>
                <div className={'console-body'}>
                    <div className={'console-list'}>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><img src={listBottom} alt={'项目列表'}/></div>
                            <div className={'item-text'}>项目列表</div>
                        </div>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><img src={datasource} alt={'数据源管理'}/></div>
                            <div className={'item-text'}>数据源管理</div>
                        </div>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><img src={templateMarket} alt={'模板市场'}/></div>
                            <div className={'item-text'}>模板市场</div>
                        </div>
                    </div>
                    <div className={'console-content'}>
                        <div className={'content-body'}>
                            <div className={'project-list'}>
                                <div style={{width: width, height: height, margin: '0 20px 20px 0'}}>
                                    <LcButton onClick={this.addNewBigScreen}
                                              style={{width: width, height: height, fontSize: 20}}>+ 新建项目</LcButton>
                                </div>
                                {data && data.map((item: any) => {
                                    let bgImgUrl = imageIdToUrl[item.projectConfig?.screenshot];
                                    return (
                                        <div key={item.id + ''}
                                             style={{
                                                 width: width,
                                                 height: height,
                                                 backgroundImage: bgImgUrl && `url(${bgImgUrl})`,
                                                 backgroundSize: 'cover',
                                             }}
                                             onClick={this.openScreen}
                                             id={item.id + ''}
                                             className={'project-item'}>{item.projectConfig?.name}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <AddNewScreenDialog onOk={this.addNewBigScreenOk} onCancel={this.addNewBigScreenCancel}
                                    visible={addNewScreen} onChange={this.addNewScreenDialogChanged}/>
            </div>
        );
    }
}

export default withRouter(LightChaserList);