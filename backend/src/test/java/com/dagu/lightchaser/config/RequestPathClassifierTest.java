package com.dagu.lightchaser.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RequestPathClassifierTest {

    @Test
    void shouldTreatFrontendDeepLinkAsRoute() {
        assertTrue(RequestPathClassifier.isFrontendRoutePath("/home/console"));
    }

    @Test
    void shouldNotTreatApiPathAsFrontendRoute() {
        assertFalse(RequestPathClassifier.isFrontendRoutePath("/api/project/pageList"));
    }

    @Test
    void shouldTreatIndexAsStaticResource() {
        assertTrue(RequestPathClassifier.isStaticResourceRequestPath("/index.html"));
    }

    @Test
    void shouldTreatRootAsFrontendEntryPage() {
        assertTrue(RequestPathClassifier.isStaticResourceRequestPath("/"));
    }
}
