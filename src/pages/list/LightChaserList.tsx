import {Component} from 'react';
import './style/LightChaserList.less';
import AddNewProjectDialog, {NewProjectInfoType} from "./AddNewProjectDialog";
import {ImgUtil} from "../../utils/ImgUtil";
import {IProjectInfo, ProjectState, SaveType} from "../../designer/DesignerType";
import designerStore from "../../designer/store/DesignerStore";
import EditorDesignerLoader from "../../designer/loader/EditorDesignerLoader";
import Dialog from "../../ui/dialog/Dialog";
import {message} from "antd";
import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";
import URLUtil from "../../utils/URLUtil";
import {
    CodeSandboxSquareFilled,
    CopyFilled,
    DatabaseFilled,
    DeleteFilled,
    EditFilled,
    EyeFilled,
    HomeFilled,
    ShopFilled
} from "@ant-design/icons";

class LightChaserList extends Component<any> {

    state: any = {
        showAddDialog: false,
        showDelDialog: false,
        showCloneDialog: false,
        addNewData: {},
        data: [],
        imageIdToUrl: {}
    }

    toBeDelId: string = '';
    toBeCloneId: string = '';

    componentDidMount() {
        this.loadProjectList();
    }

    loadProjectList = () => {
        EditorDesignerLoader.getInstance().scannerProjectOperators();
        const {projectConfig: {saveType = SaveType.LOCAL}} = designerStore;
        EditorDesignerLoader.getInstance().operatorMap[saveType].getProjectList().then((data: any) => {
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
        if (data.saveType === SaveType.SERVER) {
            //保存到服务器
            const project: IProjectInfo = {
                name: data.name,
                des: data.description,
                saveType: SaveType.SERVER,
            };
            EditorDesignerLoader.getInstance().operatorMap[SaveType.SERVER].createProject(project).then((id) => {
                console.log('create project success, id: ', id);
            });
        }
        // let urlParams = URLUtil.buildUrlParams({...data, ...{action: 'create'}});
        // this.setState({addNewScreen: false});
        // window.open(`/designer?${urlParams}`, '_blank');
    }

    onCancel = () => this.setState({addNewScreen: false});

    operateHandler = (e: any) => {
        const {type, savetype} = e.target.dataset
        if (!type) return;
        let id = e.currentTarget.id;
        switch (type) {
            case 'edit':
                let params = URLUtil.buildUrlParams({
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
                this.setState({delDialog: true});
                break;
            case 'clone':
                this.toBeCloneId = id;
                this.setState({cloneDialog: true});
                break;
            default:
                break;

        }
    }

    confirmDel = () => {
        EditorDesignerLoader.getInstance().operatorMap[SaveType.LOCAL].deleteProject(this.toBeDelId);
        let {data} = this.state;
        data = data.filter((item: any) => item.id !== this.toBeDelId);
        this.setState({data, delDialog: false});
    }

    cancelDel = () => {
        this.setState({delDialog: false});
    }

    confirmClone = (name: string) => {
        const operator = EditorDesignerLoader.getInstance().operatorMap[SaveType.LOCAL];
        operator.copyProject(this.toBeCloneId, name).then((id) => {
            //重新加载项目列表
            operator.getProjectList().then((simpleInfoList: any) => {
                this.setState({data: simpleInfoList, cloneDialog: false});
                message.success('克隆成功');
                // ImgUtil.getImageFromLocalWithKey(newSimpleInfo[0].screenshot).then((obj: any) => {
                //     this.setState({
                //         data: [...this.state.data, ...newSimpleInfo],
                //         imageIdToUrl: {...this.state.imageIdToUrl, ...obj},
                //         showCloneDialog: false
                //     });
                // })
            })
        });
    }

    cancelClone = () => {
        this.setState({cloneDialog: false});
    }

    render() {
        const {addNewScreen, data, imageIdToUrl, showDelDialog, showCloneDialog} = this.state;
        let width = (window.innerWidth - 230 - (5 * 20)) / 5;
        let height = width * (9 / 16);
        return (
            <div className={'lc-console'}>
                <div className={'console-head'}>
                    <div className={'console-head-title'}>LIGHT CHASER 控制台</div>
                </div>
                <div className={'console-body'}>
                    <div className={'console-list'}>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><HomeFilled/></div>
                            <div className={'item-text'}>本地项目</div>
                        </div>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><DatabaseFilled/></div>
                            <div className={'item-text'}>在线项目</div>
                        </div>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><CodeSandboxSquareFilled/></div>
                            <div className={'item-text'}>数据源管理</div>
                        </div>
                        <div className={'console-list-item'}>
                            <div className={'item-icon'}><ShopFilled/></div>
                            <div className={'item-text'}>模板市场</div>
                        </div>
                    </div>
                    <div className={'console-content'}>
                        <div className={'content-body'}>
                            <div className={'project-list'}>
                                <div style={{width: width, height: height, margin: '0 20px 20px 0'}}>
                                    <Button onClick={this.toggleNewProVisible}
                                            style={{width: width, height: height, fontSize: 20}}>+ 新建项目</Button>
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
                                             onClick={this.operateHandler}
                                             id={item.id + ''}
                                             className={'project-item'}>
                                            <div className={'pro-list-content'} style={{zIndex: 1}}>
                                                <div className={'pro-content-title'}>{item?.name}</div>
                                                <div className={'pro-content-operates'}>
                                                    <div className={'operate-item'} data-type={'edit'}>
                                                        <EditFilled/>
                                                    </div>
                                                    <div className={'operate-item'} data-type={'show'}
                                                         data-savetype={item.saveType}><EyeFilled/>
                                                    </div>
                                                    <div className={'operate-item'} data-type={'del'}>
                                                        <DeleteFilled/>
                                                    </div>
                                                    <div className={'operate-item'} data-type={'clone'}>
                                                        <CopyFilled/>
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
                <AddNewProjectDialog onOk={this.onOk} onCancel={this.onCancel} visible={addNewScreen}/>
                <DeleteDialog visible={showDelDialog} onOk={this.confirmDel} onCancel={this.cancelDel}/>
                <CloneDialog onOk={(name) => this.confirmClone(name)} onCancel={this.cancelClone}
                             visible={showCloneDialog}/>
            </div>
        );
    }
}

export default LightChaserList;


interface DelDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const DeleteDialog = (props: DelDialogProps) => {

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
                <Button onClick={onOk}>确认</Button>
                <Button onClick={onCancel}>取消</Button>
            </div>
        </Dialog>
    )
}

interface CloneDialogProps {
    onOk: (cloneName: string) => void;
    onCancel: () => void;
    visible: boolean;
}

const CloneDialog = (props: CloneDialogProps) => {

    const {onOk, onCancel, visible} = props;

    let cloneName = "";

    const onSubmit = (event: any) => {
        console.log(cloneName)
        event.preventDefault();
        onOk(cloneName)
    }

    return (
        <Dialog title={'克隆项目'} visible={visible} onClose={onCancel}>
            <form onSubmit={onSubmit}>
                <Input label={'项目名称'} required={true} defaultValue={cloneName}
                       onChange={(name) => cloneName = name as string}/>
                <div className={'del-pro-confirm'} style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderTop: '2px solid #272b34',
                    paddingTop: 10
                }}>
                    <Button type={'submit'}>确认</Button>
                    <Button onClick={onCancel}>取消</Button>
                </div>
            </form>
        </Dialog>
    )
}