import {useEffect} from "react";
import DataSourceList from "./DataSourceList.tsx";
import dataSourceStore from "./DataSourceStore.ts";
import {Button} from "antd";
import EditDataSourceDialog, {DataSourceConfigType} from "./edit/EditDataSourceDialog.tsx";
import {observer} from "mobx-react";

const DatasourceManager = observer(() => {
    const {createVisible, setCreateVisible} = dataSourceStore;

    const onClose = () => setCreateVisible(false);

    const onSave = (data: DataSourceConfigType) => dataSourceStore.createDataSource(data);

    useEffect(() => {
        dataSourceStore.getDataSourceList();
    }, []);

    return (
        <>
            <Button type="primary" shape={'default'} style={{marginBottom: 10}} ghost={true}
                    onClick={() => setCreateVisible(true)}>新建数据源</Button>
            <DataSourceList/>
            {createVisible && <EditDataSourceDialog title={'新建数据源'} onSave={onSave}
                                                    onClose={onClose}/>}
        </>
    );
})

export default DatasourceManager