import './UserInfo.less';
import {Edit, Left} from "@icon-park/react";
import {KeyboardEvent, useEffect, useState} from "react";
import {Input} from "antd";
import {IUser} from "../user-management/UserManagementStore.ts";
import AuthFetchUtil from "../../../utils/AuthFetchUtil.ts";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import {useNavigate} from "react-router-dom";
import AuthTools from "../../../utils/AuthTools.ts";

export default function UserInfo() {

    const [userInfo, setUserInfo] = useState<IUser | null>(null);

    const navigate = useNavigate();

    const updateUserInfo = (data: Partial<IUser>) => {
        data = {...userInfo, ...data};
        AuthFetchUtil.post("/api/user/update", data).then(res => {
            const {code, msg} = res;
            if (code === 200) {
                const newInfo = {...userInfo, ...data};
                setUserInfo(newInfo)
                globalMessage.messageApi?.success("修改成功");
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    useEffect(() => {
        const userId = AuthTools.getUserId();
        AuthFetchUtil.get(`/api/user/getUser/${userId}`).then(res => {
            const {code, data, msg} = res;
            if (code === 200)
                setUserInfo(data);
            else
                globalMessage.messageApi?.error(msg);
        })
    }, []);

    return (
        <div className="user-info-detail">
            <div className="user-info-header">
                <div className="info-header-left">
                    <div className="icon-return"><Left onClick={() => navigate(-1)} size={20}/></div>
                    <div>个人中心</div>
                </div>
            </div>
            <div className="user-info-body">
                <EditUserInfo label="用户名" value={userInfo?.name || ''}
                              onEdit={(value) => updateUserInfo({name: value})}/>
                <EditUserInfo label="密码" value="*****" type="password"
                              onEdit={(value) => updateUserInfo({password: value})}/>
                <EditUserInfo label="电话" value={userInfo?.phone || ''}
                              onEdit={(value) => updateUserInfo({phone: value})}/>
                <EditUserInfo label="邮箱" value={userInfo?.email || ''}
                              onEdit={(value) => updateUserInfo({email: value})}/>
            </div>
        </div>
    )
}

interface UserInfoProps {
    label: string;
    value: string;
    onEdit: (value: string) => void;
    type?: string;
}

function EditUserInfo(props: UserInfoProps) {
    const {label, value, type, onEdit} = props;
    const [edit, setEdit] = useState(false);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEdit(false);
            onEdit((e.target as HTMLInputElement).value);
        }
    }

    return (
        <div className="user-info-item">
            <div className="item-label">{label}</div>
            <div className="item-value">
                {edit ? <Input onKeyDown={onKeyDown}
                               onBlur={() => setEdit(false)}
                               type={type}
                               autoFocus={true}
                               size={"large"}
                               defaultValue={value}/> : <>{value}
                    <span className="icon-operate">
                    <Edit onClick={() => setEdit(true)}/></span></>}
            </div>
        </div>
    )
}