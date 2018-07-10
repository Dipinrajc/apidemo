/**
 * Copyright(c) 2018 Mozanta Technologies Private Ltd.
 *
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Mozanta
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * contract agreement you entered into with Mozanta.
 *
 */
package com.example.demo.security.filter;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

/**
 * @author Dipin
 *
 */
public class APIKeyAuthFilter extends AbstractPreAuthenticatedProcessingFilter {

    private final String principalRequestKey;

    public APIKeyAuthFilter(final String principalRequestKey) {
        this.principalRequestKey = principalRequestKey;
    }

    @Override
    protected Object getPreAuthenticatedPrincipal(final HttpServletRequest request) {
        return request.getParameter(this.principalRequestKey);
        /**
         * TODO
         * if you want send key in request header
         * Change request.getParameter(this.principalRequestKey); to request.getHeader(this.principalRequestKey);
         */
    }

    @Override
    protected Object getPreAuthenticatedCredentials(final HttpServletRequest request) {
        return "N/A";
    }
}
