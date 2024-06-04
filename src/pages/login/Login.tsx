import './Login.less';
import Input from "../../json-schema/ui/input/Input";
import Button from "../../json-schema/ui/button/Button";
import CheckBox from "../../json-schema/ui/checkbox/CheckBox";
import {globalMessage} from "../../framework/message/GlobalMessage";
import {useNavigate} from "react-router-dom";
import {memo} from "react";
import LocalOperator from "../../framework/operate/LocalOperator.ts";
import {SaveType} from "../../designer/DesignerType.ts";
import proA from './pro1.json';
import proB from './pro2.json';
import localforage from "localforage";
import {LIGHT_CHASER_PROJECT_LIST} from "../../global/GlobalConstants.ts";


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
                                   defaultValue={account}
                                   label={'账户'}/>
                        </div>
                        <div className={'login-item'}>
                            <Input onChange={value => password = value as string}
                                   defaultValue={password}
                                   label={'密码'}
                                   type={'password'}/>
                        </div>
                        <div className={'login-item remember-me'}><CheckBox label={'记住我'} defaultValue={false}/>
                        </div>
                        <div className={'login-item'}><Button onClick={login}>登录</Button></div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Login;

const localOperator = new LocalOperator();

localforage.getItem(LIGHT_CHASER_PROJECT_LIST).then((value) => {
    if (!value) {
        localOperator.createProject({
            name: '测试项目A',
            des: '测试项目A',
            saveType: SaveType.LOCAL,
            dataJson: JSON.stringify(proA.data)
        }).then(() => {
            localOperator.createProject({
                name: '测试项目B',
                des: '测试项目B',
                saveType: SaveType.LOCAL,
                dataJson: JSON.stringify(proB.data)
            })
        })
    }
})




