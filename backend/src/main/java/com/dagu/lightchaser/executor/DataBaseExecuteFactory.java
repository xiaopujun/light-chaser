package com.dagu.lightchaser.executor;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import com.dagu.lightchaser.model.constants.DataBaseEnum;
import com.dagu.lightchaser.model.po.CommonDatasourcePO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

/**
 * 数据库执行工厂类
 *
 * @author zhenglin
 * @date 2025/07/26
 */

public class DataBaseExecuteFactory {

    private static final Logger logger = LoggerFactory.getLogger(DataBaseExecuteFactory.class);

    private static final Map<DataBaseEnum, String> databaseDriverMap = new HashMap<>();

    private static final Map<String, HikariDataSource> datasourceCache = new HashMap<>();

    static {
        databaseDriverMap.put(DataBaseEnum.SQLite, "org.sqlite.JDBC");
        databaseDriverMap.put(DataBaseEnum.MySQL, "com.mysql.cj.jdbc.Driver");
        databaseDriverMap.put(DataBaseEnum.ORACLE, "oracle.jdbc.driver.OracleDriver");
        databaseDriverMap.put(DataBaseEnum.SQLServer, "com.microsoft.sqlserver.jdbc.SQLServerDriver");
        databaseDriverMap.put(DataBaseEnum.PostgresSQL, "org.postgresql.Driver");
    }

    /**
     * 构建数据源连接
     *
     * @param commonDatasourcePO 数据源实体
     * @return {@link JdbcTemplate}
     */
    public static JdbcTemplate buildDataSource(CommonDatasourcePO commonDatasourcePO) {
        String key = generateCacheKey(commonDatasourcePO);
        
        HikariDataSource cachedDataSource = datasourceCache.get(key);
        if (cachedDataSource != null && !cachedDataSource.isClosed()) {
            return new JdbcTemplate(cachedDataSource);
        }
        
        try {
            HikariConfig config = createHikariConfig(commonDatasourcePO);
            HikariDataSource dataSource = new HikariDataSource(config);
            
            // 验证连接
            testConnection(dataSource, commonDatasourcePO.getType());
            
            datasourceCache.put(key, dataSource);
            logger.info("创建数据源连接成功: {}", commonDatasourcePO.getUrl());
            
            return new JdbcTemplate(dataSource);
        } catch (Exception e) {
            logger.error("创建数据源连接失败: {}, 错误信息: {}", commonDatasourcePO.getUrl(), e.getMessage());
            throw new RuntimeException("数据库连接失败: " + e.getMessage(), e);
        }
    }

    /**
     * 创建HikariCP配置
     *
     * @param commonDatasourcePO 数据源实体
     * @return {@link HikariConfig}
     */
    private static HikariConfig createHikariConfig(CommonDatasourcePO commonDatasourcePO) {
        HikariConfig config = new HikariConfig();
        
        String driverClassName = databaseDriverMap.get(commonDatasourcePO.getType());
        if (driverClassName == null) {
            throw new IllegalArgumentException("不支持的数据库类型: " + commonDatasourcePO.getType());
        }
        
        config.setDriverClassName(driverClassName);
        config.setJdbcUrl(normalizeJdbcUrl(commonDatasourcePO.getUrl(), commonDatasourcePO.getType()));
        config.setUsername(commonDatasourcePO.getUsername());
        config.setPassword(commonDatasourcePO.getPassword());
        
        // HikariCP 连接池配置
        config.setMaximumPoolSize(5);
        config.setMinimumIdle(1);
        config.setConnectionTimeout(30000);  // 30秒连接超时
        config.setIdleTimeout(600000);       // 10分钟空闲超时
        config.setMaxLifetime(1800000);      // 30分钟最大生命周期
        config.setLeakDetectionThreshold(60000); // 1分钟泄露检测
        
        // 数据库特定配置
        switch (commonDatasourcePO.getType()) {
            case MySQL:
                config.addDataSourceProperty("useUnicode", "true");
                config.addDataSourceProperty("characterEncoding", "utf8");
                config.addDataSourceProperty("useSSL", "false");
                config.addDataSourceProperty("allowPublicKeyRetrieval", "true");
                config.addDataSourceProperty("serverTimezone", "Asia/Shanghai");
                break;
            case PostgresSQL:
                config.addDataSourceProperty("connectTimeout", "5000");
                config.addDataSourceProperty("socketTimeout", "30000");
                break;
            case ORACLE:
                config.addDataSourceProperty("oracle.jdbc.ReadTimeout", "30000");
                break;
            case SQLServer:
                config.addDataSourceProperty("trustServerCertificate", "true");
                break;
            case SQLite:
                config.addDataSourceProperty("journal_mode", "WAL");
                break;
            default:
                // 默认配置
                break;
        }
        
        return config;
    }
    
    /**
     * 测试数据库连接
     *
     * @param dataSource 数据源
     * @param dbType 数据库类型
     */
    private static void testConnection(DataSource dataSource, DataBaseEnum dbType) throws SQLException {
        try (var connection = dataSource.getConnection()) {
            String testSql = getTestSql(dbType);
            try (var statement = connection.prepareStatement(testSql)) {
                statement.executeQuery();
            }
        }
    }
    
    /**
     * 规范化JDBC URL
     *
     * @param originalUrl 原始URL
     * @param dbType 数据库类型
     * @return 规范化后的JDBC URL
     */
    private static String normalizeJdbcUrl(String originalUrl, DataBaseEnum dbType) {
        if (originalUrl == null || originalUrl.trim().isEmpty()) {
            throw new IllegalArgumentException("数据库URL不能为空");
        }
        
        String url = originalUrl.trim();
        
        // 如果已经是完整的JDBC URL，直接返回
        if (url.startsWith("jdbc:")) {
            return url;
        }
        
        // 根据数据库类型构建完整的JDBC URL
        switch (dbType) {
            case SQLite:
                // SQLite特殊处理：如果不是文件路径，认为是相对路径
                if (url.equals("localhost") || !url.contains("/")) {
                    return "jdbc:sqlite:./data/" + url + ".db";
                }
                return "jdbc:sqlite:" + url;
                
            case MySQL:
                // MySQL默认端口3306
                if (!url.contains(":")) {
                    url += ":3306";
                }
                if (!url.startsWith("//")) {
                    url = "//" + url;
                }
                return "jdbc:mysql:" + url + "?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai";
                
            case PostgresSQL:
                // PostgreSQL默认端口5432
                if (!url.contains(":")) {
                    url += ":5432";
                }
                if (!url.startsWith("//")) {
                    url = "//" + url;
                }
                return "jdbc:postgresql:" + url;
                
            case ORACLE:
                // Oracle默认端口1521
                if (!url.contains(":")) {
                    url += ":1521";
                }
                if (!url.startsWith("//")) {
                    url = "//" + url;
                }
                return "jdbc:oracle:thin:@" + url;
                
            case SQLServer:
                // SQL Server默认端口1433
                if (!url.contains(":")) {
                    url += ":1433";
                }
                if (!url.startsWith("//")) {
                    url = "//" + url;
                }
                return "jdbc:sqlserver:" + url + ";trustServerCertificate=true";
                
            default:
                return url;
        }
    }
    
    /**
     * 获取测试SQL语句
     *
     * @param dbType 数据库类型
     * @return 测试SQL
     */
    private static String getTestSql(DataBaseEnum dbType) {
        switch (dbType) {
            case ORACLE:
                return "SELECT 1 FROM DUAL";
            case SQLServer:
                return "SELECT 1";
            case MySQL:
            case PostgresSQL:
            case SQLite:
            default:
                return "SELECT 1";
        }
    }
    
    /**
     * 生成缓存键
     *
     * @param commonDatasourcePO 数据源实体
     * @return 缓存键
     */
    private static String generateCacheKey(CommonDatasourcePO commonDatasourcePO) {
        return commonDatasourcePO.getUrl() + "_" + commonDatasourcePO.getUsername() + "_" +
               commonDatasourcePO.getPassword() + "_" + commonDatasourcePO.getType();
    }
    
    /**
     * 移除数据源缓存
     *
     * @param commonDatasourcePO 数据源实体
     */
    public static void removeDatasourceCache(CommonDatasourcePO commonDatasourcePO) {
        String key = generateCacheKey(commonDatasourcePO);
        HikariDataSource dataSource = datasourceCache.remove(key);
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
            logger.info("关闭数据源连接: {}", commonDatasourcePO.getUrl());
        }
    }
    
    /**
     * 清理所有缓存的数据源
     */
    public static void clearAllCache() {
        datasourceCache.values().forEach(dataSource -> {
            if (!dataSource.isClosed()) {
                dataSource.close();
            }
        });
        datasourceCache.clear();
        logger.info("已清理所有数据源缓存");
    }
}
