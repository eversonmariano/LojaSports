package com.everson.ecommerce.sports.service;

import com.everson.ecommerce.sports.entities.Type;
import com.everson.ecommerce.sports.model.TypeResponse;
import com.everson.ecommerce.sports.repository.TypeRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.stream.Collectors;

@Log4j2
@Service
public class TypeServiceImpl implements TypeService{

    private final TypeRepository typeRepository;

    public TypeServiceImpl(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    @Override
    public List<TypeResponse> getAllTypes() {
       log.info("Fetching All Types!");
       List<Type> typeList = typeRepository.findAll();
       //Now use stream operator to map with Response
        List<TypeResponse> typeResponses = typeList.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        return typeResponses;
    }

    private TypeResponse convertToResponse(Type type) {
        return TypeResponse.builder()
                .id(type.getId())
                .name(type.getName())
                .build();
    }
}
