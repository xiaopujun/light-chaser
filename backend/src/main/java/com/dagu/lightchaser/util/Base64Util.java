package com.dagu.lightchaser.util;

public class Base64Util {
    public static String encode(String str) {
        return java.util.Base64.getEncoder().encodeToString(str.getBytes());
    }

    public static String decode(String str) {
        return new String(java.util.Base64.getDecoder().decode(str));
    }
}
