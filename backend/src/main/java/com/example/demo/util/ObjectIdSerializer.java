package com.example.demo.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.bson.types.ObjectId;

import java.io.IOException;

public class ObjectIdSerializer extends JsonSerializer<ObjectId> {
    /**
     * Method that can be called to ask implementation to serialize
     * values of type this serializer handles.
     *
     * @param objectId      Value to serialize; can <b>not</b> be null.
     * @param jsonGenerator Generator used to output resulting Json content
     * @param serializers   Provider that can be used to get serializers for
     */
    @Override
    public void serialize(final ObjectId objectId, final JsonGenerator jsonGenerator, final SerializerProvider serializers) throws IOException {
        jsonGenerator.writeString(objectId.toString());
    }
}