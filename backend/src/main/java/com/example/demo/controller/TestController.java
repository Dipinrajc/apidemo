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
package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

import com.example.demo.entity.RestResponse;
import com.example.demo.entity.SocialData;
import com.example.demo.repository.SocialDataRepository;

/**
 * @author Dipin
 *
 */
@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private SocialDataRepository socialDataRepository;

    @ControllerAdvice
    static class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {

        public JsonpAdvice() {
            super("callback");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/name", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<RestResponse> test(@RequestParam(value = "callback", required = false) final String callback,
            @RequestParam(value = "name", defaultValue = "name", required = false) final String name,
            @RequestParam(value = "id", defaultValue = "1", required = false) final String id) throws JSONException {
        final Map<String, Object> response = new HashMap<>();
        response.put("name", name);
        response.put("id", id);
        if (null != callback) {
            // return new ResponseEntity<>(callback + "(" + obj + ")", HttpStatus.OK);
        }
        return new ResponseEntity<>(new RestResponse(Boolean.TRUE, null, response), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/fblike", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<RestResponse> fbLike(
            @RequestParam(value = "callback", required = false) final String callback,
            @RequestParam(value = "fbUserId") final String fbUserId,
            @RequestParam(value = "name", defaultValue = "name", required = false) final String name,
            @RequestParam(value = "id", defaultValue = "1", required = false) final String id) throws JSONException {

        SocialData socialData = this.socialDataRepository.findByTypeAndUserIdAndProductId("FBLIKE", fbUserId, id);
        if (null == socialData) {
            socialData = new SocialData();
            socialData.setProductId(id);
            socialData.setType("FBLIKE");
            socialData.setUserId(fbUserId);
        } else {
            socialData.setEnabled(!socialData.isEnabled());
        }
        this.socialDataRepository.save(socialData);

        final Map<String, Object> response = new HashMap<>();
        response.put("name", name);
        response.put("id", id);
        response.put("like", socialData.isEnabled());
        return new ResponseEntity<>(new RestResponse(Boolean.TRUE, null, name), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/check", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<RestResponse> check(@RequestParam(value = "callback", required = false) final String callback,
            @RequestParam(value = "fbUserId") final String fbUserId,
            @RequestParam(value = "id", defaultValue = "1", required = false) final String id) throws JSONException {
        Boolean liked = false;
        final SocialData socialData = this.socialDataRepository.findByTypeAndUserIdAndProductId("FBLIKE", fbUserId, id);
        if (null != socialData && socialData.isEnabled()) {
            liked = true;
        }
        return new ResponseEntity<>(new RestResponse(Boolean.TRUE, null, liked), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/getlikes", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<RestResponse> getLikes(
            @RequestParam(value = "callback", required = false) final String callback,
            @RequestParam(value = "id", defaultValue = "1") final String productId) throws JSONException {
        final List<SocialData> socialDatas = this.socialDataRepository.findByTypeAndProductIdAndEnabled("FBLIKE",
                productId, true);
        final List<String> ids = new ArrayList<String>();
        for (final SocialData socialData : socialDatas) {
            if (!ids.contains(socialData.getUserId())) {
                ids.add(socialData.getUserId());
            }
        }
        return new ResponseEntity<>(new RestResponse(Boolean.TRUE, null, ids), HttpStatus.OK);
    }

    @RequestMapping(value = "/auth/facebook", method = RequestMethod.POST)
    public ResponseEntity<?> authenticateFB(@RequestBody final Map<String, Object> body,
            final HttpServletRequest request) {
        return null;
        /*
         * final OAuthClientRequest request = OAuthClientRequest.tokenLocation(config.getLinkedInAccessTokenUrl())
         * .setGrantType(GrantType.AUTHORIZATION_CODE).setCode(code).setClientId(clientId)
         * .setRedirectURI(redirectUrl).setClientSecret(config.getLinkedInClientSecret()).buildBodyMessage();
         * final OAuthClient oAuthClient = new OAuthClient(new URLConnectionClient());
         * final OAuthClientResponse oAuthResponse = oAuthClient.accessToken(request);
         * final String accessToken = oAuthResponse.getParam(OAuth.OAUTH_ACCESS_TOKEN);
         * final String expiresIn = oAuthResponse.getParam(OAuth.OAUTH_EXPIRES_IN);
         * log.debug("Linked Access Token: {}, expiresIn: {}", accessToken, expiresIn);
         * if (null != accessToken) {
         * return new ResponseEntity<>(accessToken, HttpStatus.OK);
         * } else {
         * return new ResponseEntity<>("Authentication failed", HttpStatus.BAD_REQUEST);
         * }
         */
    }
}
