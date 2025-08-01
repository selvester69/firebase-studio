package com.test.ordertracker.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

public class JsonDataLoader {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public <T> List<T> loadList(String fileName, TypeReference<List<T>> typeReference) throws IOException {
        InputStream inputStream = new ClassPathResource("data/" + fileName).getInputStream();
        return objectMapper.readValue(inputStream, typeReference);
    }

    public <T> T loadObject(String fileName, Class<T> type) throws IOException {
        InputStream inputStream = new ClassPathResource("data/" + fileName).getInputStream();
        return objectMapper.readValue(inputStream, type);
    }

     public Map<String, Object> loadMap(String fileName) throws IOException {
        InputStream inputStream = new ClassPathResource("data/" + fileName).getInputStream();
        return objectMapper.readValue(inputStream, new TypeReference<Map<String, Object>>() {});
    }
}
