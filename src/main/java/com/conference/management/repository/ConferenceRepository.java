package com.conference.management.repository;

import com.conference.management.domain.Conference;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Conference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {

    List<Conference> findByAccepted(boolean accepted);

    @Query("select conference from Conference conference where conference.user.login = ?#{principal.username}")
    List<Conference> findByUserIsCurrentUser();

}
