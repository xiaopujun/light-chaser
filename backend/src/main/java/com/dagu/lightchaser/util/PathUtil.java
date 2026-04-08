package com.dagu.lightchaser.util;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public final class PathUtil {

    private PathUtil() {
        // 工具类私有构造
    }

    /**
     * 规范化路径，并转换为绝对路径
     *
     * @param first 起始路径
     * @param more  其他路径片段
     * @return 绝对规范化路径
     */
    public static String normalize(String first, String... more) {
        var path = Paths.get(first, more).normalize().toAbsolutePath();
        return path.toString();
    }

    /**
     * 拼接路径
     *
     * @param first 起始路径
     * @param more  其他路径片段
     * @return 拼接后的路径
     */
    public static String join(String first, String... more) {
        return Paths.get(first, more).toString();
    }

    /**
     * 返回前端友好的路径，统一使用 '/'
     *
     * @param first 起始路径
     * @param more  其他路径片段
     * @return 前端友好路径
     */
    public static String toWebPath(String first, String... more) {
        var path = Paths.get(first, more).normalize();
        return path.toString().replace("\\", "/");
    }

    /**
     * 创建目录（如果不存在）
     *
     * @param first 起始路径
     * @param more  其他路径片段
     * @return 创建后的目录路径
     * @throws IOException 创建失败抛出异常
     */
    public static String createDirs(String first, String... more) throws IOException {
        var path = Paths.get(first, more).normalize().toAbsolutePath();
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
        return path.toString();
    }

    /**
     * 判断路径是否存在
     *
     * @param first 起始路径
     * @param more  其他路径片段
     * @return true: 存在; false: 不存在
     */
    public static boolean exists(String first, String... more) {
        return Files.exists(Paths.get(first, more));
    }
}
