import React, {ComponentType} from "react";

const Project = React.lazy(() => import('./project-list/ProjectList').then(module => ({default: module.ProjectList})));
const DatasourceManager = React.lazy(() => import('./datasource/DatasourceManager').then(module => ({default: module.DatasourceManager})));
const TemplateMarket = React.lazy(() => import('./template-market/TemplateMarket').then(module => ({default: module.TemplateMarket})));

export const homePageMap: Record<string, ComponentType> = {
    local: Project,
    server: Project,
    datasource: DatasourceManager,
    template: TemplateMarket
}