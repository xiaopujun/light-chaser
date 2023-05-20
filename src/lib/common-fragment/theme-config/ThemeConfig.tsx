import React, {Component} from 'react';
import {Button} from "antd";
import ThemeItem from "./theme-item/ThemeItem";
import Dialog from "../../lc-dialog/Dialog";
import ThemeEditor from "./theme-editor/ThemeEditor";

class ThemeConfig extends Component {
    state = {
        editTheme: false,
    }

    openThemeEditor = () => this.setState({editTheme: true});

    closeEditor = () => this.setState({editTheme: false});

    render() {
        return (
            <>
                <div className={'lc-theme-config'}>
                    <div className={'lc-theme-custom'}>
                        <Button onClick={this.openThemeEditor} type={'primary'} size={'middle'} style={{width: '100%'}}>+
                            新增自定义主题</Button>
                    </div>
                    <br/>
                    <div className={'lc-theme-list'}>
                        <ThemeItem active={true} main={'#ffdac0'} text={'#ffbf7c'} background={'#ffaa59'}
                                   auxiliary={'#ff8d3b'}
                                   emphasize={'#ff6e00'} supplementary={'#c35a00'}/>
                        <ThemeItem main={'#c0e5ff'} text={'#7cbaff'} background={'#59aaff'} auxiliary={'#3b8dff'}
                                   emphasize={'#0072ff'} supplementary={'#005ac3'}/>
                        <ThemeItem main={'#ffeac0'} text={'#ffdf7c'} background={'#ffc659'} auxiliary={'#ffb23b'}
                                   emphasize={'#ffa000'} supplementary={'#c37900'}/>
                        <ThemeItem main={'#e7c0ff'} text={'#b17cff'} background={'#9959ff'} auxiliary={'#7b3bff'}
                                   emphasize={'#5800ff'} supplementary={'#4f00c3'}/>
                        <ThemeItem main={'#c6c6c6'} text={'#969696'} background={'#6f6f6f'} auxiliary={'#4c4c4c'}
                                   emphasize={'#292929'} supplementary={'#1f1f1f'}/>
                        <ThemeItem main={'#c0a978'} text={'#7c5d3d'} background={'#a97542'} auxiliary={'#8d5c3b'}
                                   emphasize={'#724028'} supplementary={'#5a3200'}/>
                    </div>
                </div>
                <Dialog onClose={this.closeEditor} title={'编辑主题'} visible={this.state.editTheme} width={860}>
                    <ThemeEditor/>
                </Dialog>
            </>
        );
    }
}

export default ThemeConfig;