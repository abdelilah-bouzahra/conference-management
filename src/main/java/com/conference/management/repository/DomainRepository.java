package com.conference.management.repository;

import com.conference.management.domain.Domain;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Domain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DomainRepository extends JpaRepository<Domain, Long> {

    @Query(value = "select distinct domain from Domain domain left join fetch domain.users",
        countQuery = "select count(distinct domain) from Domain domain")
    Page<Domain> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct domain from Domain domain left join fetch domain.users")
    List<Domain> findAllWithEagerRelationships();

    @Query("select domain from Domain domain left join fetch domain.users where domain.id =:id")
    Optional<Domain> findOneWithEagerRelationships(@Param("id") Long id);

}
