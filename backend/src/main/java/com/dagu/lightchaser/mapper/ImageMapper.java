package com.dagu.lightchaser.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dagu.lightchaser.model.po.ImagePO;
import org.apache.ibatis.annotations.Mapper;

//完善注释信息

/**
 * 图片Mapper
 *
 * @Table: image
 */
@Mapper
public interface ImageMapper extends BaseMapper<ImagePO> {

}
