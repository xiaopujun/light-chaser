/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import React, {useEffect, useState} from "react";
import dataSourceStore from "./DataSourceStore.ts";
import {Button, Input, List, Space, Tag} from "antd";
import {observer} from "mobx-react";
import {Add} from "@icon-park/react";
import {globalModal} from "../../../framework/message/GlobalModal.tsx";
import DataSourcePanel from "./DataSourcePanel.tsx";
import './DataSourceList.less';

const {Search} = Input;

const DataSourceList = observer(() => {
    const {
        setPanelVisible,
        doCreateOrUpdateDataSource,
        init,
        destroy,
        panelVisible,
        dataSourcePageData,
        dataSource
    } = dataSourceStore;

    const {current, records, size, total} = dataSourcePageData;
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    useEffect(() => {
        init();
        return () => destroy();
    }, []);

    const handleSearch = (value: string) => {
        dataSourceStore.searchValue = value;
        dataSourceStore.getDataSourceList();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSearch((event.target as HTMLInputElement).value);
    };

    const handleActionClick = (e: React.MouseEvent, action: string, id: string) => {
        e.stopPropagation();
        switch (action) {
            case 'edit':
                dataSourceStore.openDataSourceEditor(id);
                break;
            case 'copy':
                dataSourceStore.copyDataSource(id);
                break;
            case 'delete':
                globalModal.modalApi?.confirm({
                    title: '删除确认',
                    content: '确定删除该数据源吗？',
                    okText: '删除',
                    cancelText: '取消',
                    onOk: () => dataSourceStore.doBatchDeleteDataSource([id])
                });
                break;
            case 'test':
                dataSourceStore.testConnect(id);
                break;
        }
    };

    return (
        <div className="datasource-list">
            <div className="datasource-list-header">
                <div className="header-left">
                    <Search
                        placeholder="搜索数据源"
                        size="middle"
                        className="project-list-search"
                        onKeyDown={handleKeyDown}
                        onSearch={handleSearch}
                        style={{width: 350}}
                    />
                    <Button
                        className="operate-btn primary"
                        size="middle"
                        onClick={() => setPanelVisible(true)}
                    >
                        <Add style={{position: 'relative', top: 2, marginRight: 3}}/>
                        新建
                    </Button>
                </div>
                <div className="header-right"></div>
            </div>

            <div className="datasource-list-body">
                <List grid={{gutter: 8, column: 4}}
                      dataSource={records}
                      pagination={{
                          showTotal: () => `共${total}条`,
                          pageSize: size,
                          current,
                          total,
                          position: 'bottom',
                          align: 'center',
                          onChange: (page) => dataSourceStore.changeCurrentPage(page!)
                      }}
                      renderItem={(item) => (
                          <List.Item className="datasource-item"
                                     onMouseEnter={() => setHoveredCard(item.id!)}
                                     onMouseLeave={() => setHoveredCard(null)}>
                              <div className={`datasource-card ${hoveredCard === item.id ? 'hovered' : ''}`}
                                   onClick={() => dataSourceStore.openDataSourceEditor(item.id!)}>
                                  <div className="card-header">
                                      <Tag color="#00A650" className="type-tag">{item.type}</Tag>
                                      {hoveredCard === item.id && (
                                          <Space className="card-actions" onClick={e => e.stopPropagation()}>
                                              <span className="action-btn" onClick={(e) => handleActionClick(e, 'copy', item.id!)}>[复制]</span>
                                              <span className="action-btn" onClick={(e) => handleActionClick(e, 'delete', item.id!)}>[删除]</span>
                                              <span className="action-btn" onClick={(e) => handleActionClick(e, 'test', item.id!)}>[测试]</span>
                                          </Space>
                                      )}
                                  </div>
                                  <div className="card-title">{item.name}</div>
                              </div>
                          </List.Item>
                      )}
                />
            </div>

            <DataSourcePanel
                visible={panelVisible}
                title={dataSource.id ? '编辑数据源' : '新建数据源'}
                data={dataSource}
                onClose={() => setPanelVisible(false)}
                onSubmitted={doCreateOrUpdateDataSource}
            />
        </div>
    );
});

export default DataSourceList;