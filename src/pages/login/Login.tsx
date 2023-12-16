import React from "react";
import './Login.less';
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import {CheckBox} from "../../ui/checkbox/CheckBox";
import {message} from "antd";

export const Login: React.FC = props => {

    let account = 'admin';
    let password = 'admin';

    const login = () => {
        if (account === 'admin' && password === 'admin') {
            window.location.href = '/home';
        } else {
            message.warn('账户或密码错误');
        }
    }

    return (
        <div className={'lc-login'}>
            <div className={'lc-login-container'}>
                <div className={'lc-login-left'}/>
                <div className={'lc-login-right'}>
                    <div className={'login-header'}>
                        <p className={'header-title'}>LIGHT CHASER</p>
                        <p className={'header-des'}>快捷，高效的数据可视化设计工具</p>
                    </div>
                    <div className={'login-body'}>
                        <div className={'login-item'}>
                            <Input required={true}
                                   onChange={value => account = value as string}
                                   defaultValue={account}
                                   label={'账户'}
                                   placeholder={'Username'}/>
                        </div>
                        <div className={'login-item'}>
                            <Input required={true}
                                   onChange={value => password = value as string}
                                   defaultValue={password}
                                   label={'密码'}
                                   type={'password'}
                                   placeholder={'Password'}/>
                        </div>
                        <div className={'login-item remember-me'}><CheckBox label={'记住我'} defaultValue={false}/></div>
                        <div className={'login-item'}><Button onClick={login}>登录</Button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};