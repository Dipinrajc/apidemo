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

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Dipin
 *
 */
@Document(collection = "social_data")
@Data
@EqualsAndHashCode(callSuper = false)
public class SocialData extends BaseDocument {

    private static final long serialVersionUID = 1L;

    private String userId;

    private String productId;
}
