package com.dagu.lightchaser.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.dagu.lightchaser.model.dto.ImageDTO;
import com.dagu.lightchaser.model.po.ImagePO;
import com.dagu.lightchaser.model.query.PageParamQuery;

import java.util.List;

public interface ImageService extends IService<ImagePO> {
    /**
     * 上传图片
     *
     * @param imageDTO 图片实体
     * @return 图片地址
     */
    String uploadImage(ImageDTO imageDTO);


    /**
     * 批量删除图片资源
     *
     * @param imageIdList 图片id列表
     * @return 是否删除成功
     */
    Boolean batchDeleteImage(List<Long> imageIdList);

    /**
     * 获取图片列表
     *
     * @param pageParam 分页参数
     * @return 图片列表
     */
    Page<ImageDTO> getImagePageList(PageParamQuery pageParam);

    /**
     * 根据图片名称获取图片
     *
     * @param urls 图片名称
     * @return 图片列表
     */
    List<ImagePO> getImages(List<String> urls);

    /**
     * 创建文件
     *
     * @param imagePO 文件对象
     */
    ImagePO createImage(ImagePO imagePO);
}
