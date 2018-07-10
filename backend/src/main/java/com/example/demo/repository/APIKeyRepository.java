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
package com.example.demo.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.APIKey;

/**
 * @author Dipin
 *
 */
public interface APIKeyRepository extends MongoRepository<APIKey<?>, ObjectId> {

    APIKey<?> findOneByKey(final String key);
}
