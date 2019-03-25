package com.conference.management.web.rest;
import com.conference.management.domain.Opinion;
import com.conference.management.repository.OpinionRepository;
import com.conference.management.web.rest.errors.BadRequestAlertException;
import com.conference.management.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Opinion.
 */
@RestController
@RequestMapping("/api")
public class OpinionResource {

    private final Logger log = LoggerFactory.getLogger(OpinionResource.class);

    private static final String ENTITY_NAME = "opinion";

    private final OpinionRepository opinionRepository;

    public OpinionResource(OpinionRepository opinionRepository) {
        this.opinionRepository = opinionRepository;
    }

    /**
     * POST  /opinions : Create a new opinion.
     *
     * @param opinion the opinion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new opinion, or with status 400 (Bad Request) if the opinion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/opinions")
    public ResponseEntity<Opinion> createOpinion(@Valid @RequestBody Opinion opinion) throws URISyntaxException {
        log.debug("REST request to save Opinion : {}", opinion);
        if (opinion.getId() != null) {
            throw new BadRequestAlertException("A new opinion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Opinion result = opinionRepository.save(opinion);
        return ResponseEntity.created(new URI("/api/opinions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /opinions : Updates an existing opinion.
     *
     * @param opinion the opinion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated opinion,
     * or with status 400 (Bad Request) if the opinion is not valid,
     * or with status 500 (Internal Server Error) if the opinion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/opinions")
    public ResponseEntity<Opinion> updateOpinion(@Valid @RequestBody Opinion opinion) throws URISyntaxException {
        log.debug("REST request to update Opinion : {}", opinion);
        if (opinion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Opinion result = opinionRepository.save(opinion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, opinion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /opinions : get all the opinions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of opinions in body
     */
    @GetMapping("/opinions")
    public List<Opinion> getAllOpinions() {
        log.debug("REST request to get all Opinions");
        return opinionRepository.findAll();
    }

    /**
     * GET  /opinions/:id : get the "id" opinion.
     *
     * @param id the id of the opinion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the opinion, or with status 404 (Not Found)
     */
    @GetMapping("/opinions/{id}")
    public ResponseEntity<Opinion> getOpinion(@PathVariable Long id) {
        log.debug("REST request to get Opinion : {}", id);
        Optional<Opinion> opinion = opinionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(opinion);
    }

    /**
     * DELETE  /opinions/:id : delete the "id" opinion.
     *
     * @param id the id of the opinion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/opinions/{id}")
    public ResponseEntity<Void> deleteOpinion(@PathVariable Long id) {
        log.debug("REST request to delete Opinion : {}", id);
        opinionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
