import './Login.less';
import Input from "../../json-schema/ui/input/Input";
import Button from "../../json-schema/ui/button/Button";
import {globalMessage} from "../../framework/message/GlobalMessage";
import {useNavigate} from "react-router-dom";
import {memo} from "react";

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
                <div className={'lc-login-left'}/>
                <div className={'lc-login-right'}>
                    <div className={'login-header'}>
                        <p className={'header-title'}>LIGHT CHASER</p>
                        <p className={'header-des'}>快捷，高效的数据可视化设计工具</p>
                    </div>
                    <div className={'login-body'}>
                        <div className={'login-item'}>
                            <Input onChange={value => account = value as string}
                                   placeholder={'用户名'}
                                   defaultValue={account}/>
                        </div>
                        <div className={'login-item'}>
                            <Input onChange={value => password = value as string}
                                   defaultValue={password}
                                   placeholder={'密码'}
                                   type={'password'}/>
                        </div>
                        <div className={'login-item'}><Button onClick={login}>登录</Button></div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Login;