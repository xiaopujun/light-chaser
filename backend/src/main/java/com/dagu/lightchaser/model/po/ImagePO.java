package com.dagu.lightchaser.model.po;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * ImagePO
 * <p>
 * Persistent Object（持久对象）
 * 映射数据库表：image
 */
@TableName("image")
@Data
@Accessors(chain = true)
public class ImagePO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 图片存储的 URL 地址
     */
    private String url;

    /**
     * 图片名称
     */
    private String name;

    /**
     * 删除标记（0=未删除，1=已删除）
     */
    @TableLogic
    private Integer deleted;

    /**
     * 创建时间
     * 默认值：CURRENT_TIMESTAMP
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     * 默认值：CURRENT_TIMESTAMP
     */
    private LocalDateTime updateTime;
}
