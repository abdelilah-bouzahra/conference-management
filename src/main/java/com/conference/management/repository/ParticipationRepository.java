package com.conference.management.repository;

import com.conference.management.domain.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Participation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    List<Participation> findByAccepted(boolean accepted);

    @Query("select participation from Participation participation where participation.user.login = ?#{principal.username}")
    List<Participation> findByUserIsCurrentUser();

}
