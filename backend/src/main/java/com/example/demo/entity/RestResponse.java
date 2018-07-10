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
package com.example.demo.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by Dipin
 */
@AllArgsConstructor
@NoArgsConstructor
public class RestResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Getter
    @Setter
    private Boolean success;

    @Getter
    @Setter
    private List<String> messages;

    @Getter
    @Setter
    private Object data;

    @Getter
    @Setter
    private String errorCode;

    /**
     * @param success
     * @param message
     * @param data
     */
    public RestResponse(final Boolean success, final String message, final Object data) {
        this(success, createMessages(message), data, null);
    }

    /**
     * We need to call this for error responses
     *
     * @param errorCode
     */
    public RestResponse(final String message, final String errorCode) {
        this(Boolean.FALSE, createMessages(message), null, errorCode);
    }

    private static List<String> createMessages(final String message) {
        List<String> messages = null;
        if (null != message) {
            messages = new ArrayList<>();
            messages.add(message);
        }
        return messages;
    }
}
