import {message} from "antd";
import {useEffect} from "react";
import {MessageInstance} from "antd/es/message/interface";

class GMessage {
    public messageApi: MessageInstance | null = null;

    public setMessageApi(messageApi: MessageInstance | null) {
        this.messageApi = messageApi;
    }

}

const globalMessage = new GMessage();
export {globalMessage};


export default function GlobalMessage() {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        globalMessage.setMessageApi(messageApi);
        return () => {
            globalMessage.setMessageApi(null);
        }
    }, []);

    return (
        <>
            {contextHolder}
        </>
    )
}