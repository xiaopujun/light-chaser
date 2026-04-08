package com.dagu.lightchaser.global;

//这个枚举类中定义的都是跟业务有关的异常
public enum AppExceptionCodeMsg {

    INVALID_CODE(10000, "验证码无效"),
    USERNAME_NOT_EXISTS(10001, "用户名不存在"),
    USER_CREDIT_NOT_ENOUTH(10002, "用户积分不足");;

    private final int code;
    private final String msg;

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }


    AppExceptionCodeMsg(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}