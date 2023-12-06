import React, {ComponentType} from "react";

const LocalProjectList = React.lazy(() => import('./local-list/LocalProjectList').then(module => ({default: module.LocalProjectList})));
const ServerProjectList = React.lazy(() => import('./server-list/ServerProjectList').then(module => ({default: module.ServerProjectList})));
const DatasourceManager = React.lazy(() => import('./datasource/DatasourceManager').then(module => ({default: module.DatasourceManager})));
const TemplateMarket = React.lazy(() => import('./template-market/TemplateMarket').then(module => ({default: module.TemplateMarket})));

export const homePageMap: Record<string, ComponentType> = {
    local: LocalProjectList,
    server: ServerProjectList,
    datasource: DatasourceManager,
    template: TemplateMarket
}