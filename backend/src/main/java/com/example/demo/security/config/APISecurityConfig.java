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
package com.example.demo.security.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import com.example.demo.entity.APIKey;
import com.example.demo.repository.APIKeyRepository;
import com.example.demo.security.filter.APIKeyAuthFilter;

/**
 * @author Dipin
 *
 */
@Configuration
@EnableWebSecurity
@Order(1)
public class APISecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private APIKeyRepository apiKeyRepository;

    private final String principalRequestHeader = "apiKey";

    @Override
    protected void configure(final HttpSecurity httpSecurity) throws Exception {
        final APIKeyAuthFilter filter = new APIKeyAuthFilter(this.principalRequestHeader);
        filter.setAuthenticationManager(new AuthenticationManager() {

            @Override
            public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
                final String principal = (String) authentication.getPrincipal();
                /**
                 *
                 * Set of api keys are stored in a list
                 *
                 */
                /*
                 * if (!APISecurityConfig.getPrincipalRequestValues().contains(principal)) {
                 * throw new BadCredentialsException("The API key was not found or not the expected value.");
                 * }
                 */

                /**
                 *
                 * Api key is fetching from collection
                 *
                 */
                if (!validKey(principal)) {
                    throw new BadCredentialsException("The API key was not found or not the expected value.");
                }
                authentication.setAuthenticated(true);
                return authentication;
            }
        });
        httpSecurity.antMatcher("/**").csrf().disable().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().addFilter(filter).authorizeRequests()
                .anyRequest().permitAll();
        // authenticated();
    }

    public static List<String> getPrincipalRequestValues() {
        final List<String> principalRequestValues = new ArrayList<String>();
        principalRequestValues.add("abcd");
        principalRequestValues.add("aaaa");
        return principalRequestValues;
    }

    public Boolean validKey(final String key) {
        Boolean validKey = Boolean.FALSE;
        final APIKey<?> apiKey = this.apiKeyRepository.findOneByKey(key);
        if (null != apiKey) {
            if (!apiKey.isEnabled()) {
                throw new BadCredentialsException("The API key was disabled or not activated.");
            }
            validKey = Boolean.TRUE;
        }
        return validKey;
    }
}
