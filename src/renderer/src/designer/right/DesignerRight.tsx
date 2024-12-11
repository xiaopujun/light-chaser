import MenuList from "./MenuList";
import ConfigContent from "./ConfigContent";
import rightStore from "./RightStore";
import {observer} from "mobx-react";

const DesignerRight = observer(() => {
    const {visible} = rightStore;
    return (
        <>
            <MenuList/>
            {visible && <ConfigContent/>}
        </>
    );
})

export default DesignerRight;