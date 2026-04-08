package com.dagu.lightchaser;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.dagu.lightchaser"})
@MapperScan("com.dagu.lightchaser.mapper")
public class LightChaserServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(LightChaserServerApplication.class, args);
    }

}
