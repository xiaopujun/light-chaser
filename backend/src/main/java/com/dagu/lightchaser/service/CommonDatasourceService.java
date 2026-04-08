package com.dagu.lightchaser.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.dagu.lightchaser.model.dto.CommonDatasourceDTO;
import com.dagu.lightchaser.model.dto.DatasourceAddRequest;
import com.dagu.lightchaser.model.dto.DatasourceUpdateRequest;
import com.dagu.lightchaser.model.po.CommonDatasourcePO;
import com.dagu.lightchaser.model.query.PageParamQuery;

import java.util.List;

/**
 * @author DAGU
 * @description 针对表【datasource(数据源管理)】的数据库操作Service
 * @createDate 2024-04-12 11:07:34
 */
public interface CommonDatasourceService extends IService<CommonDatasourcePO> {

    List<CommonDatasourceDTO> getDataSourceList();

    Long addDataSource(CommonDatasourceDTO datasource);

    Long addDataSource(DatasourceAddRequest request);

    Boolean updateDataSource(DatasourceUpdateRequest datasource) throws Exception;

    CommonDatasourceDTO getDataSource(Long id);

    Boolean copyDataSource(Long id);

    Boolean delDataSource(Long id);

    Boolean testDataSourceConnect(Long id);

    Page<CommonDatasourceDTO> getDataSourcePageList(PageParamQuery pageParam);
}
