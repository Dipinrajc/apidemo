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

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author Dipin
 *
 */
@Document(collection = "apikey")
@Data
public class APIKey<PK extends Serializable> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private PK id;

    private String key;

    private boolean enabled;
}
