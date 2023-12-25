import React, {useMemo, useState} from 'react';
import {observer} from "mobx-react";
import './DemoMain.less';
import {ColorPicker} from "antd";
import {Color} from "antd/es/color-picker";


const HexCase = () => {
    const [colorHex, setColorHex] = useState<Color | string>('#1677ff');

    const hexString = useMemo(
        () => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()),
        [colorHex],
    );
    return (
        <>
            <ColorPicker
                size={'small'}
                format={'hex'}
                value={colorHex}
                onChange={setColorHex}
            />
            <span>{hexString}</span>
        </>
    );
};

class MyComponent extends React.Component {

    render() {
        return (
            <div style={{padding: 10}}>
                <HexCase/>
            </div>
        )
    }

}

export default observer(MyComponent);
