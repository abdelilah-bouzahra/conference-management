package com.conference.management.repository;

import com.conference.management.domain.Opinion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Opinion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OpinionRepository extends JpaRepository<Opinion, Long> {

    @Query("select opinion from Opinion opinion where opinion.user.login = ?#{principal.username}")
    List<Opinion> findByUserIsCurrentUser();

}
