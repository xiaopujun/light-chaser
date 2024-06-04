import {useNavigate} from "react-router-dom";
import {Button, Result} from "antd";

export default function Error() {
    const navigate = useNavigate();
    return (
        <Result
            status="500"
            subTitle="服务器错误，请联系管理员"
            extra={<Button type="primary" onClick={() => navigate('/home/server')}>返回首页</Button>}
        />
    );
}