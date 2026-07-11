package com.cardealership.inventory.repository;

import com.cardealership.inventory.dto.VehicleSearchCriteria;
import com.cardealership.inventory.entity.Vehicle;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class VehicleSpecification {

    public static Specification<Vehicle> getSearchSpecification(VehicleSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(criteria.getMake())) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("make")), 
                        "%" + criteria.getMake().toLowerCase() + "%"));
            }

            if (StringUtils.hasText(criteria.getModel())) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("model")), 
                        "%" + criteria.getModel().toLowerCase() + "%"));
            }

            if (StringUtils.hasText(criteria.getCategory())) {
                predicates.add(criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("category")), 
                        criteria.getCategory().toLowerCase()));
            }

            if (criteria.getMinPrice() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("price"), criteria.getMinPrice()));
            }

            if (criteria.getMaxPrice() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("price"), criteria.getMaxPrice()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
