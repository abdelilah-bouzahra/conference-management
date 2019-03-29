package com.conference.management.web.rest;

import com.conference.management.domain.AbstractAuditingEntity;
import com.conference.management.domain.Conference;
import com.conference.management.domain.User;
import com.conference.management.repository.ConferenceRepository;
import com.conference.management.repository.UserRepository;
import com.conference.management.security.SecurityUtils;
import com.conference.management.service.UserService;
import com.conference.management.service.dto.UserDTO;
import com.conference.management.web.rest.errors.BadRequestAlertException;
import com.conference.management.web.rest.errors.LoginAlreadyUsedException;
import com.conference.management.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.Serializable;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Conference.
 */
@RestController
@RequestMapping("/api")
public class ConferenceResource extends AbstractAuditingEntity implements Serializable {

    private final Logger log = LoggerFactory.getLogger(ConferenceResource.class);

    private static final String ENTITY_NAME = "conference";

    private final ConferenceRepository conferenceRepository;

    @Autowired
    private UserRepository userRepository;

    public ConferenceResource(ConferenceRepository conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }

    /**
     * POST  /conferences : Create a new conference.
     *
     * @param conference the conference to create
     * @return the ResponseEntity with status 201 (Created) and with body the new conference, or with status 400 (Bad Request) if the conference has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/conferences")
    public ResponseEntity<Conference> createConference(@Valid @RequestBody Conference conference) throws Exception {
        log.debug("REST request to save Conference : {}", conference);
        if (conference.getId() != null) {
            throw new BadRequestAlertException("A new conference cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
        if (userLogin.isPresent()) {
            Optional<User> user = userRepository.findOneByLogin(userLogin.get());
            conference.setUser(user.orElse(null));
        }

        Conference result = conferenceRepository.save(conference);
        return ResponseEntity.created(new URI("/api/conferences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /conferences : Updates an existing conference.
     *
     * @param conference the conference to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated conference,
     * or with status 400 (Bad Request) if the conference is not valid,
     * or with status 500 (Internal Server Error) if the conference couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/conferences")
    public ResponseEntity<Conference> updateConference(@Valid @RequestBody Conference conference) throws URISyntaxException {
        log.debug("REST request to update Conference : {}", conference);
        if (conference.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Conference result = conferenceRepository.save(conference);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, conference.getId().toString()))
            .body(result);
    }

    /**
     * GET  /conferences : get all the conferences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of conferences in body
     */
    @GetMapping("/conferences")
    public List<Conference> getAllConferences() {
        log.debug("REST request to get all Conferences");
        return conferenceRepository.findByAccepted(true);
    }

    /**
     * GET  /conferences/:id : get the "id" conference.
     *
     * @param id the id of the conference to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the conference, or with status 404 (Not Found)
     */
    @GetMapping("/conferences/{id}")
    public ResponseEntity<Conference> getConference(@PathVariable Long id) {
        log.debug("REST request to get Conference : {}", id);
        Optional<Conference> conference = conferenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(conference);
    }

    /**
     * DELETE  /conferences/:id : delete the "id" conference.
     *
     * @param id the id of the conference to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/conferences/{id}")
    public ResponseEntity<Void> deleteConference(@PathVariable Long id) {
        log.debug("REST request to delete Conference : {}", id);
        conferenceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
