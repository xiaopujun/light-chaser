import {FormEvent, useRef, useState} from 'react';
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


const ThemeEditor = () => {
    const initConfigRef = useRef<ThemeItemType>({
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
    });
    const [data, setDate] = useState<ThemeItemType[]>(cloneDeep(designerStore.themeConfig) || []);
    const [themeConfig, setThemeConfig] = useState<ThemeItemType>(initConfigRef.current);

    const nameChanged = (name: string) => {
        setThemeConfig({...themeConfig, name})
    }

    const mainColorChanged = (color: string) => {
        setThemeConfig({
            ...themeConfig,
            colors: {...themeConfig.colors, main: color}
        })
    }

    const mainTextChanged = (color: string) => {
        setThemeConfig({
            ...themeConfig,
            colors: {...themeConfig.colors, mainText: color}
        })
    }

    const subTextChanged = (color: string) => {
        setThemeConfig({
            ...themeConfig,
            colors: {...themeConfig.colors, subText: color}
        })
    }

    const backgroundChanged = (color: string) => {
        setThemeConfig({
            ...themeConfig,
            colors: {...themeConfig.colors, background: color}
        })
    }

    const supplementFirstChanged = (color: string) => {
        setThemeConfig({
            ...themeConfig,
            colors: {...themeConfig.colors, supplementFirst: color}
        })
    }

    const supplementSecondChanged = (color: string) => {
        setThemeConfig({
            ...themeConfig,
            colors: {...themeConfig.colors, supplementSecond: color}
        })
    }

    const doSaveOrUpd = (e: FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault();
        if (themeConfig.id === '') {
            if (data.length > 20)
                alert('主题数量已达上限');
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === themeConfig.name) {
                    alert('主题名称重复');
                    return;
                }
            }
            themeConfig.id = data.length + 1 + '';
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
        setDate(data)
        setThemeConfig(initConfigRef.current);
        //保存到数据库
        const {updateThemeConfig} = designerStore;
        updateThemeConfig(data);
    }

    const onDel = (id: string) => {
        const newData = data.filter((item: ThemeItemType) => item.id !== id);
        setDate(newData);
    }

    const onSelected = (data: ThemeItemType) => {
        if (themeConfig.id === data.id)
            setThemeConfig(initConfigRef.current);
        else
            setThemeConfig(data);
    }

    return (
        <div className={'lc-theme-editor'}>
            <div className={'editor-left'}>
                <form onSubmit={doSaveOrUpd}>
                    <CardPanel label={'主题信息'}>
                        <UIContainer label={'名称'}>
                            <Input value={themeConfig.name} onChange={nameChanged}/>
                        </UIContainer>
                    </CardPanel>
                    <CardPanel label={'颜色定义'}>
                        <Grid columns={3} gridGap={'15px'}>
                            <UIContainer label={'主体色'}>
                                <ColorPicker onChange={mainColorChanged}
                                             showText={true}
                                             value={themeConfig.colors.main}/>
                            </UIContainer>
                            <UIContainer label={'主文字'}>
                                <ColorPicker onChange={mainTextChanged}
                                             showText={true}
                                             value={themeConfig.colors.mainText}/>
                            </UIContainer>
                            <UIContainer label={'辅文字'}>
                                <ColorPicker onChange={subTextChanged}
                                             showText={true}
                                             value={themeConfig.colors.subText}/>
                            </UIContainer>
                            <UIContainer label={'背景色'}>
                                <ColorPicker onChange={backgroundChanged}
                                             showText={true}
                                             value={themeConfig.colors.background}/>
                            </UIContainer>
                            <UIContainer label={'补充一'}>
                                <ColorPicker onChange={supplementFirstChanged}
                                             showText={true}
                                             value={themeConfig.colors.supplementFirst}/>
                            </UIContainer>
                            <UIContainer label={'补充二'}>
                                <ColorPicker onChange={supplementSecondChanged}
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
                    <ThemeList showOperator={true} onSelected={onSelected} onDel={onDel}/>
                </CardPanel>
            </div>
        </div>
    );

}


export default ThemeEditor;