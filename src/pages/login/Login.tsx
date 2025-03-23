/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import './Login.less';
import {Button, Input} from 'antd';
import {globalMessage} from "../../framework/message/GlobalMessage";
import {useNavigate} from "react-router-dom";
import {memo} from "react";
import logo from './login-logo.png';
import user from './user.svg';
import lock from './lock.svg';

const Login = memo(() => {

    const navigate = useNavigate();

    let account = 'admin';
    let password = 'admin';

    const login = () => {
        if (account === 'admin' && password === 'admin') {
            navigate('home/local');
        } else {
            globalMessage.messageApi?.warning('账户或密码错误');
        }
    }

    return (
        <div className={'lc-login'}>
            <div className={'lc-login-container'}>
                <div className={'login-header'}>
                    <p className={'header-logo'}><img src={logo} alt={'logo'}/></p>
                    <p className={'header-des'}>快捷，高效的数据可视化设计工具</p>
                </div>
                <div className={'login-body'}>
                    <div className={'login-item'}>
                        <Input prefix={<img alt={'user'} src={user}/>} size={'large'}
                               onChange={e => account = e.target.value}
                               placeholder={'用户名'}
                               defaultValue={account}/>
                    </div>
                    <div className={'login-item'}>
                        <Input prefix={<img alt={'lock'} src={lock}/>} size={'large'}
                               onChange={e => password = e.target.value}
                               placeholder={'密码'}
                               defaultValue={password}
                               type={'password'}/>
                    </div>
                    <div className={'login-item'}><Button size={'large'} style={{width: '100%'}} type="primary"
                                                          onClick={login}>登录</Button>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Login;