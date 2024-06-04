import {useNavigate} from "react-router-dom";
import {Button, Result} from "antd";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            subTitle="找不到页面"
            extra={<Button type="primary" onClick={() => navigate('/home/server')}>返回首页</Button>}
        />
    );
}