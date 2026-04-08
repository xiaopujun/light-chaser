package com.dagu.lightchaser.global;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {Exception.class})
    @ResponseBody
    public <T> ApiResponse<T> exceptionHandler(Exception e) {
        //打印堆栈信息
        e.printStackTrace();
        //这里先判断拦截到的Exception是不是我们自定义的异常类型
        if (e instanceof AppException) {
            AppException appException = (AppException) e;
            return ApiResponse.error(appException.getCode(), appException.getMsg());
        }

        //如果拦截的异常不是我们自定义的异常(例如：数据库主键冲突)
        return ApiResponse.error(500, "服务器端异常");
    }
}