package com.dagu.lightchaser.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class FileUtil {

    /**
     * 将源文件保存到目标目录下，可重命名
     *
     * @param sourceFile     源文件
     * @param targetDir      目标目录路径（必须是目录）
     * @param targetFileName 目标文件名（可选，null则使用原始文件名）
     * @return 保存后的文件对象
     * @throws IOException 如果操作失败
     */
    public static File saveFileToDirectory(File sourceFile, String targetDir, String targetFileName) throws IOException {
        if (sourceFile == null || !sourceFile.exists())
            throw new IllegalArgumentException("源文件不存在");

        File dir = new File(targetDir);
        if (!dir.exists()) {
            if (!dir.mkdirs()) {
                throw new IOException("目标目录创建失败: " + targetDir);
            }
        }

        if (!dir.isDirectory())
            throw new IllegalArgumentException("目标路径不是目录: " + targetDir);

        String finalFileName = (targetFileName != null && !targetFileName.isEmpty())
                ? targetFileName
                : sourceFile.getName();

        Path targetPath = new File(dir, finalFileName).toPath();
        Files.copy(sourceFile.toPath(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        return targetPath.toFile();
    }

    /**
     * 将路径中的分隔符统一转换为 "/"
     *
     * @param path 原始路径（可能含有 \ 或 /）
     * @return 统一为 "/" 的路径
     */
    public static String normalizePath(String path) {
        if (path == null) return null;
        return path.replace("\\", "/");
    }

    /**
     * 移除路径开头的分隔符
     *
     * @param path 原始路径（可能开头有 \ 或 /）
     * @return 移除开头分隔符后的路径
     */
    public static String removeBeginSeparator(String path) {
        if (path == null) return null;
        if (path.startsWith("/") || path.startsWith("\\"))
            return path.substring(1);
        return path;
    }

}
