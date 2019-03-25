package com.conference.management.web.rest;
import com.conference.management.domain.Domain;
import com.conference.management.repository.DomainRepository;
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
 * REST controller for managing Domain.
 */
@RestController
@RequestMapping("/api")
public class DomainResource {

    private final Logger log = LoggerFactory.getLogger(DomainResource.class);

    private static final String ENTITY_NAME = "domain";

    private final DomainRepository domainRepository;

    public DomainResource(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    /**
     * POST  /domains : Create a new domain.
     *
     * @param domain the domain to create
     * @return the ResponseEntity with status 201 (Created) and with body the new domain, or with status 400 (Bad Request) if the domain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/domains")
    public ResponseEntity<Domain> createDomain(@Valid @RequestBody Domain domain) throws URISyntaxException {
        log.debug("REST request to save Domain : {}", domain);
        if (domain.getId() != null) {
            throw new BadRequestAlertException("A new domain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Domain result = domainRepository.save(domain);
        return ResponseEntity.created(new URI("/api/domains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /domains : Updates an existing domain.
     *
     * @param domain the domain to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated domain,
     * or with status 400 (Bad Request) if the domain is not valid,
     * or with status 500 (Internal Server Error) if the domain couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/domains")
    public ResponseEntity<Domain> updateDomain(@Valid @RequestBody Domain domain) throws URISyntaxException {
        log.debug("REST request to update Domain : {}", domain);
        if (domain.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Domain result = domainRepository.save(domain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, domain.getId().toString()))
            .body(result);
    }

    /**
     * GET  /domains : get all the domains.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of domains in body
     */
    @GetMapping("/domains")
    public List<Domain> getAllDomains(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Domains");
        return domainRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /domains/:id : get the "id" domain.
     *
     * @param id the id of the domain to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the domain, or with status 404 (Not Found)
     */
    @GetMapping("/domains/{id}")
    public ResponseEntity<Domain> getDomain(@PathVariable Long id) {
        log.debug("REST request to get Domain : {}", id);
        Optional<Domain> domain = domainRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(domain);
    }

    /**
     * DELETE  /domains/:id : delete the "id" domain.
     *
     * @param id the id of the domain to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/domains/{id}")
    public ResponseEntity<Void> deleteDomain(@PathVariable Long id) {
        log.debug("REST request to delete Domain : {}", id);
        domainRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
