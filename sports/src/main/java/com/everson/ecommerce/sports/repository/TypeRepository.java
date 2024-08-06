package com.everson.ecommerce.sports.repository;

import com.everson.ecommerce.sports.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer> {

}
