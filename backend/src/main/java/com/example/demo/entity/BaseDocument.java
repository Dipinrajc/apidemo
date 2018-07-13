/**
 * Copyright(c) 2018 Mozanta Technologies Private Ltd.
 * <p>
 * All rights reserved.
 * <p>
 * This software is the confidential and proprietary information of Mozanta
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * contract agreement you entered into with Mozanta.
 */
package com.example.demo.entity;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Dipin
 */

@Document
@Data
@EqualsAndHashCode(callSuper = false)
public abstract class BaseDocument extends AuditEntity<ObjectId> {

    private String type;

    private boolean enabled = true;

    public void setId(final String id) {
        if (null != id) {
            super.setId(new ObjectId(id));
        }
    }
}
