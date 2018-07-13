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

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.SocialData;

/**
 * @author Dipin
 *
 */
public interface SocialDataRepository extends MongoRepository<SocialData, ObjectId> {

    SocialData findByTypeAndUserIdAndProductId(final String type, final String userId, final String productId);

    List<SocialData> findByTypeAndProductIdAndEnabled(final String type, final String productId, Boolean enabled);
}
