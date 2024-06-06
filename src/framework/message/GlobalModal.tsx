import {Modal} from "antd";
import {useEffect} from "react";
import {HookAPI} from "antd/es/modal/useModal";

class GModal {
    public modalApi: HookAPI | null = null;

    public setModalApi(modalApi: HookAPI | null) {
        this.modalApi = modalApi;
    }

}

const globalModal = new GModal();
export {globalModal};


export default function GlobalModal() {
    const [modalApi, contextHolder] = Modal.useModal();

    useEffect(() => {
        globalModal.setModalApi(modalApi);
        return () => {
            globalModal.setModalApi(null);
        }
    }, []);

    return (
        <>
            {contextHolder}
        </>
    )
}