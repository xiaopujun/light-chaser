import {Component, FormEvent} from 'react';
import './ThemeEditor.less';
import {ThemeItemType} from "../../../../designer/DesignerType";
import designerStore from "../../../../designer/store/DesignerStore";
import ThemeList from "../theme-list/ThemeList";
import {cloneDeep} from "lodash";
import ColorPicker from "../../../../json-schema/ui/color-picker/ColorPicker";
import {CardPanel} from "../../../../json-schema/ui/card-panel/CardPanel";
import Input from "../../../../json-schema/ui/input/Input";
import {UIContainer} from "../../../../json-schema/ui/ui-container/UIContainer";
import {Grid} from "../../../../json-schema/ui/grid/Grid";
import Button from "../../../../json-schema/ui/button/Button";

type ThemeEditorStateType = {
    data: ThemeItemType[],
    themeConfig: ThemeItemType
}

/**
 * 主题编辑器
 */
class ThemeEditor extends Component {

    initThemeConfig: ThemeItemType = {
        id: '',
        name: '',
        colors: {
            main: '#000000',
            mainText: '#000000',
            background: '#000000',
            subText: '#000000',
            supplementFirst: '#000000',
            supplementSecond: '#000000'
        }
    }

    state: ThemeEditorStateType = {
        data: [],
        themeConfig: this.initThemeConfig
    }

    constructor(props: {}) {
        super(props);
        const themeList = designerStore.themeConfig;
        this.state.data = cloneDeep(themeList) || [];
    }


    nameChanged = (name: string | number) => {
        this.setState({themeConfig: {...this.state.themeConfig, name}})
    }

    mainColorChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, main: color}
            }
        })
    };

    mainTextChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, mainText: color}
            }
        })
    };

    subTextChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, subText: color}
            }
        })
    };

    backgroundChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, background: color}
            }
        })
    };

    supplementFirstChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, supplementFirst: color}
            }
        })
    };

    supplementSecondChanged = (color: string) => {
        this.setState({
            themeConfig: {
                ...this.state.themeConfig,
                colors: {...this.state.themeConfig.colors, supplementSecond: color}
            }
        })
    };

    doSaveOrUpd = (e: FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault();
        const {data, themeConfig} = this.state;
        if (themeConfig.id === '') {
            if (data.length > 20)
                alert('主题数量已达上限');
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === themeConfig.name) {
                    alert('主题名称重复');
                    return;
                }
            }
            themeConfig.id = this.state.data.length + 1 + '';
            data.push({...themeConfig});
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === themeConfig.id) {
                    data[i] = {...themeConfig};
                    break;
                }
            }
            themeConfig.id = '';
        }
        this.setState({data, themeConfig: this.initThemeConfig});
        //保存到数据库
        const {updateThemeConfig} = designerStore;
        updateThemeConfig(data);
    }

    onDel = (id: string) => {
        const {data} = this.state;
        const newData = data.filter((item: ThemeItemType) => item.id !== id);
        this.setState({data: newData});
    }

    onSelected = (data: ThemeItemType) => {
        const {themeConfig} = this.state;
        if (themeConfig.id === data.id)
            this.setState({themeConfig: this.initThemeConfig});
        else
            this.setState({themeConfig: data});
    }

    render() {
        const {themeConfig} = this.state;
        return (
            <div className={'lc-theme-editor'}>
                <div className={'editor-left'}>
                    <form onSubmit={this.doSaveOrUpd}>
                        <CardPanel label={'主题信息'}>
                            <UIContainer label={'名称'}>
                                <Input value={themeConfig.name} onChange={this.nameChanged}/>
                            </UIContainer>
                        </CardPanel>
                        <CardPanel label={'颜色定义'}>
                            <Grid columns={3} gridGap={'15px'}>
                                <UIContainer label={'主体色'}>
                                    <ColorPicker onChange={this.mainColorChanged}
                                                 showText={true}
                                                 value={themeConfig.colors.main}/>
                                </UIContainer>
                                <UIContainer label={'主文字'}>
                                    <ColorPicker onChange={this.mainTextChanged}
                                                 showText={true}
                                                 value={themeConfig.colors.mainText}/>
                                </UIContainer>
                                <UIContainer label={'辅文字'}>
                                    <ColorPicker onChange={this.subTextChanged}
                                                 showText={true}
                                                 value={themeConfig.colors.subText}/>
                                </UIContainer>
                                <UIContainer label={'背景色'}>
                                    <ColorPicker onChange={this.backgroundChanged}
                                                 showText={true}
                                                 value={themeConfig.colors.background}/>
                                </UIContainer>
                                <UIContainer label={'补充一'}>
                                    <ColorPicker onChange={this.supplementFirstChanged}
                                                 showText={true}
                                                 value={themeConfig.colors.supplementFirst}/>
                                </UIContainer>
                                <UIContainer label={'补充二'}>
                                    <ColorPicker onChange={this.supplementSecondChanged}
                                                 showText={true}
                                                 value={themeConfig.colors.supplementSecond}/>
                                </UIContainer>
                            </Grid>
                        </CardPanel>
                        <p style={{color: '#6e6e6e'}}>说明：自定义主题色的色值应该保持在同一色系。以确保整体统一的风格。主题色占据主要面积</p>
                        <br/>
                        <div className={'theme-operate-btn'}>
                            <Button type={"submit"}>添加 / 更新</Button>
                        </div>
                    </form>
                </div>
                <div className={'editor-right'}>
                    <CardPanel label={'主题列表'}>
                        <ThemeList showOperator={true} onSelected={this.onSelected} onDel={this.onDel}/>
                    </CardPanel>
                </div>
            </div>
        );
    }
}

export default ThemeEditor;