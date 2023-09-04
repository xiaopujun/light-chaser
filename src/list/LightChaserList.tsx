import React, {Component} from 'react';
import './style/LightChaserList.less';
import AddNewScreenDialog, {NewProjectInfoType} from "./AddNewScreenDialog";
import listBottom from './icon/list-bottom.svg';
import templateMarket from './icon/template-market.svg';
import datasource from './icon/datasource.svg';
import LcButton from "../lib/lc-button/LcButton";

import listDelImg from './list-del.svg';
import listDisplay from './list-display.svg';
import listEdit from './list-edit.svg';
import listClone from './list-clone.svg';
import {buildUrlParams} from "../utils/URLUtil";
import {ImgUtil} from "../utils/ImgUtil";
import {ProjectState, SaveType} from "../designer/DesignerType";
import designerStore from "../designer/store/DesignerStore";
import EditorDesignerLoader from "../designer/loader/EditorDesignerLoader";
import Dialog from "../lib/lc-dialog/Dialog";

class LightChaserList extends Component<any> {

    state: any = {
        showAddDialog: false,
        showDelDialog: false,
        addNewData: {},
        data: [],
        imageIdToUrl: {}
    }

    toBeDelId: string = '';

    componentDidMount() {
        EditorDesignerLoader.getInstance().scannerProjectOperators();
        const {projectConfig: {saveType = SaveType.LOCAL}} = designerStore;
        EditorDesignerLoader.getInstance().abstractOperatorMap[saveType].getProjectSimpleInfoList().then((data: any) => {
            if (data && data.length > 0) {
                this.setState({data});
                let imageIds: any = [];
                data.forEach((item: any) => {
                    let imageId = item.screenshot;
                    if (imageId && imageId !== '')
                        imageIds.push(imageId);
                });
                const promise = imageIds.map((imageId: any) => ImgUtil.getImageFromLocalWithKey(imageId));
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

    toggleNewProVisible = () => {
        const {addNewScreen} = this.state;
        this.setState({addNewScreen: !addNewScreen})
    }

    onOk = (data: NewProjectInfoType) => {
        let urlParams = buildUrlParams({...data, ...{action: 'create'}});
        this.setState({addNewScreen: false});
        window.open(`/designer?${urlParams}`, '_blank');
    }

    onCancel = () => this.setState({addNewScreen: false});

    operatoHandler = (e: any) => {
        const {type, savetype} = e.target.dataset
        let id = e.currentTarget.id;
        switch (type) {
            case 'edit':
                let params = buildUrlParams({
                    id: id,
                    action: 'edit'
                });
                window.open(`/designer?${params}`, '_blank');
                break;
            case 'show':
                window.open(`/view?id=${id}&saveType=${savetype}&action=view`, '_blank');
                break;
            case 'del':
                this.toBeDelId = id;
                this.setState({showDelDialog: true});
                break;
            default:
                alert('开发中...');

        }
    }

    confirmDel = () => {
        EditorDesignerLoader.getInstance().abstractOperatorMap[SaveType.LOCAL].deleteProject(this.toBeDelId);
        let {data} = this.state;
        data = data.filter((item: any) => item.id !== this.toBeDelId);
        this.setState({data, showDelDialog: false});
    }

    cancelDel = () => {
        this.setState({showDelDialog: false});
    }

    render() {
        const {addNewScreen, data, imageIdToUrl, showDelDialog} = this.state;
        let width = (window.innerWidth - 230 - (5 * 20)) / 5;
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
                                    <LcButton onClick={this.toggleNewProVisible}
                                              style={{width: width, height: height, fontSize: 20}}>+ 新建项目</LcButton>
                                </div>
                                {data && data.map((item: any) => {
                                    let bgImgUrl = imageIdToUrl[item?.screenshot];
                                    let stateText, stateColor;
                                    if (item.state === ProjectState.DRAFT) {
                                        stateText = '草稿';
                                        stateColor = '#FFB800';
                                    } else if (item.state === ProjectState.PUBLISH) {
                                        stateText = '已发布';
                                        stateColor = '#00CC66';
                                    }
                                    return (
                                        <div key={item.id + ''}
                                             style={{
                                                 width: width,
                                                 height: height,
                                                 backgroundImage: bgImgUrl && `url(${bgImgUrl})`,
                                             }}
                                             onClick={this.operatoHandler}
                                             id={item.id + ''}
                                             className={'project-item'}>
                                            <div className={'pro-list-content'} style={{zIndex: 1}}>
                                                <div className={'pro-content-title'}>{item?.name}</div>
                                                <div className={'pro-content-operates'}>
                                                    <div className={'operate-item'} data-type={'edit'}>
                                                        <img src={listEdit} alt={'编辑'}/>
                                                    </div>
                                                    <div className={'operate-item'} data-type={'show'}
                                                         data-savetype={item.saveType}>
                                                        <img src={listDisplay} alt={'展示'}/>
                                                    </div>
                                                    <div className={'operate-item'} data-type={'del'}>
                                                        <img src={listDelImg} alt={'删除'}/>
                                                    </div>
                                                    <div className={'operate-item'} data-type={'clone'}>
                                                        <img src={listClone} alt={'克隆'}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'pro-content-footer'}>
                                                <div className={'state-point'} style={{backgroundColor: stateColor}}/>
                                                <div className={'state-text'}
                                                     style={{color: stateColor}}>{stateText}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <AddNewScreenDialog onOk={this.onOk} onCancel={this.onCancel} visible={addNewScreen}/>
                <DeleteDialog visible={showDelDialog} onOk={this.confirmDel} onCancel={this.cancelDel}/>
            </div>
        );
    }
}

export default LightChaserList;


interface DialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const DeleteDialog = (props: DialogProps) => {

    const {onOk, onCancel, visible} = props;

    return (
        <Dialog title={'删除确认'} visible={visible} onClose={onCancel}>
            <div style={{color: '#aeaeae', padding: 10}}>确定要删除该项目吗？</div>
            <div className={'del-pro-confirm'} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '2px solid #272b34',
                paddingTop: 5
            }}>
                <LcButton onClick={onOk}>确认</LcButton>
                <LcButton onClick={onCancel}>取消</LcButton>
            </div>
        </Dialog>
    )
}