package com.dagu.lightchaser.global;

import com.dagu.lightchaser.config.RequestPathClassifier;
import org.springframework.core.io.ClassPathResource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {Exception.class})
    @ResponseBody
    public <T> ApiResponse<T> exceptionHandler(Exception e) throws Exception {
        //打印堆栈信息
        e.printStackTrace();
        if (e instanceof NoHandlerFoundException || e instanceof NoResourceFoundException) {
            throw e;
        }
        //这里先判断拦截到的Exception是不是我们自定义的异常类型
        if (e instanceof AppException) {
            AppException appException = (AppException) e;
            return ApiResponse.error(appException.getCode(), appException.getMsg());
        }

        //如果拦截的异常不是我们自定义的异常(例如：数据库主键冲突)
        return ApiResponse.error(500, "服务器端异常");
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public void handleNoHandlerFound(NoHandlerFoundException ex,
                                     HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        handleNotFound(request, response);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public void handleNoResourceFound(NoResourceFoundException ex,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        handleNotFound(request, response);
    }

    private void handleNotFound(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        String uri = request.getRequestURI();
        RequestPathClassifier.PathCategory category = RequestPathClassifier.classify(uri);
        if (category == RequestPathClassifier.PathCategory.FRONTEND_ROUTE
                || category == RequestPathClassifier.PathCategory.FRONTEND_ENTRY_PAGE) {
            writeFrontendEntry(response);
            return;
        }
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }

    private void writeFrontendEntry(HttpServletResponse response) throws IOException {
        ClassPathResource indexResource = new ClassPathResource("static/index.html");
        if (!indexResource.exists()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        response.resetBuffer();
        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setContentType("text/html;charset=UTF-8");

        try (InputStream inputStream = indexResource.getInputStream()) {
            response.getWriter().write(StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8));
        }
    }
}
