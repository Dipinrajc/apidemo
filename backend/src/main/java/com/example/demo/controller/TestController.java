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

import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

import com.example.demo.entity.RestResponse;

/**
 * @author Dipin
 *
 */
@RestController
@RequestMapping("/test")
public class TestController {

    @ControllerAdvice
    static class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {

        public JsonpAdvice() {
            super("callback");
        }
    }

    @ResponseBody
    @RequestMapping(value = "/name", method = RequestMethod.GET, produces = "application/json")
    public Object test(@RequestParam(value = "callback", required = false) final String callback,
            @RequestParam(value = "name", defaultValue = "name", required = false) final String name,
            @RequestParam(value = "id", defaultValue = "1", required = false) final String id) throws JSONException {
        final Map<String, Object> response = new HashMap<>();
        response.put("name", name);
        response.put("id", id);
        if (null != callback) {
            // return new ResponseEntity<>(callback + "(" + obj + ")", HttpStatus.OK);

            return new ResponseEntity<>(new RestResponse(Boolean.TRUE, null, response), HttpStatus.OK);
        }
        return new ResponseEntity<>(new RestResponse(Boolean.TRUE, null, name), HttpStatus.OK);
    }
}
