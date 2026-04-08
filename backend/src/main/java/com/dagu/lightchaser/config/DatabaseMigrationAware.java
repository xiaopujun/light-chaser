package com.dagu.lightchaser.config;


import com.dagu.lightchaser.core.migration.DatabaseMigration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class DatabaseMigrationAware implements ApplicationContextAware, Ordered {
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        String migrationEnable = applicationContext.getEnvironment().getProperty("light-chaser.migration.enable");
        if (migrationEnable == null || "false".equals(migrationEnable)) {
            return;
        }
        DatabaseMigration databaseMigration = applicationContext.getBean(DatabaseMigration.class);
        try {
            databaseMigration.migration();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int getOrder() {
        return 0;
    }

}
