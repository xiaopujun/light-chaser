package com.dagu.lightchaser.config;

import java.util.Set;

public final class RequestPathClassifier {

    public enum PathCategory {
        FRONTEND_ENTRY_PAGE,
        FRONTEND_BUILD_ASSET,
        FRONTEND_ROUTE,
        API,
        BUSINESS_STATIC,
        BACKEND_INTERNAL,
        FILE_REQUEST,
        UNKNOWN
    }

    private static final Set<String> FRONTEND_ENTRY_PAGES = Set.of(
            "/",
            "/index.html"
    );

    private static final Set<String> FRONTEND_BUILD_SINGLE_FILES = Set.of(
            "/favicon.ico"
    );

    private static final String[] BACKEND_INTERNAL_PREFIXES = {
            "/actuator",
            "/error"
    };

    private RequestPathClassifier() {
    }

    public static PathCategory classify(String path) {
        if (path == null || path.isBlank()) {
            return PathCategory.UNKNOWN;
        }
        if (FRONTEND_ENTRY_PAGES.contains(path)) {
            return PathCategory.FRONTEND_ENTRY_PAGE;
        }
        if (FRONTEND_BUILD_SINGLE_FILES.contains(path) || matchesPrefix(path, "/assets")) {
            return PathCategory.FRONTEND_BUILD_ASSET;
        }
        if (matchesPrefix(path, "/api")) {
            return PathCategory.API;
        }
        if (matchesPrefix(path, "/static")) {
            return PathCategory.BUSINESS_STATIC;
        }
        for (String prefix : BACKEND_INTERNAL_PREFIXES) {
            if (matchesPrefix(path, prefix)) {
                return PathCategory.BACKEND_INTERNAL;
            }
        }
        if (hasFileExtension(path)) {
            return PathCategory.FILE_REQUEST;
        }
        return PathCategory.FRONTEND_ROUTE;
    }

    public static boolean isFrontendRoutePath(String path) {
        return classify(path) == PathCategory.FRONTEND_ROUTE;
    }

    public static boolean isStaticResourceRequestPath(String path) {
        PathCategory category = classify(path);
        return category == PathCategory.FRONTEND_ENTRY_PAGE
                || category == PathCategory.FRONTEND_BUILD_ASSET
                || category == PathCategory.BUSINESS_STATIC;
    }

    private static boolean matchesPrefix(String path, String prefix) {
        return path.equals(prefix) || path.startsWith(prefix + "/");
    }

    private static boolean hasFileExtension(String path) {
        String lastPathSegment = path.substring(path.lastIndexOf('/') + 1);
        return lastPathSegment.contains(".");
    }
}
