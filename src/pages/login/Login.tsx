import './Login.less';
import Input from "../../json-schema/ui/input/Input";
import Button from "../../json-schema/ui/button/Button";
import {globalMessage} from "../../framework/message/GlobalMessage";
import {useNavigate} from "react-router-dom";
import {memo, useRef} from "react";
import FetchUtil from "../../utils/FetchUtil.ts";

const Login = memo(() => {

    const navigate = useNavigate();

    const usernameRef = useRef("admin");
    const passwordRef = useRef("123456");

    const login = () => {
        FetchUtil.post("/api/authenticate/login",
            {username: usernameRef.current, password: passwordRef.current},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(res => {
            const {code, msg, data} = res;
            if (code === 200) {
                localStorage.setItem('token', data);
                navigate('/home/server');
            } else {
                globalMessage.messageApi?.error(msg);
            }
        })
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
                            <Input onChange={value => usernameRef.current = value as string}
                                   defaultValue={usernameRef.current}
                                   label={'账户'}/>
                        </div>
                        <div className={'login-item'}>
                            <Input onChange={value => passwordRef.current = value as string}
                                   defaultValue={passwordRef.current}
                                   label={'密码'}
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