package com.dagu.lightchaser.global;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class ApiResponse<T> implements Serializable {
    //服务端返回的错误码
    private final int code;
    //服务端返回的错误信息
    private final String msg;
    //我们服务端返回的数据
    private final T data;

    private ApiResponse(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "success", data);
    }

    public static <T> ApiResponse<T> success(String msg, T data) {
        return new ApiResponse<>(200, msg, data);
    }

    public static <T> ApiResponse<T> error(AppExceptionCodeMsg appExceptionCodeMsg) {
        return new ApiResponse<>(appExceptionCodeMsg.getCode(), appExceptionCodeMsg.getMsg(), null);
    }

    public static <T> ApiResponse<T> error(int code, String msg) {
        return new ApiResponse<>(code, msg, null);
    }

}
