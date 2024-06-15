import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export default function NoAuth() {
    const navigate = useNavigate();
    return (
        <Result
            status="403"
            subTitle="没有权限访问此页面，请联系管理员申请权限。"
            extra={<Button type="primary" onClick={() => navigate('/home/server')}>返回首页</Button>}
        />
    );
}