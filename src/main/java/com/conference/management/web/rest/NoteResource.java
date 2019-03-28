package com.conference.management.web.rest;
import com.conference.management.domain.Note;
import com.conference.management.domain.User;
import com.conference.management.repository.NoteRepository;
import com.conference.management.repository.UserRepository;
import com.conference.management.security.SecurityUtils;
import com.conference.management.web.rest.errors.BadRequestAlertException;
import com.conference.management.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Note.
 */
@RestController
@RequestMapping("/api")
public class NoteResource {

    private final Logger log = LoggerFactory.getLogger(NoteResource.class);

    private static final String ENTITY_NAME = "note";

    private final NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public NoteResource(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    /**
     * POST  /notes : Create a new note.
     *
     * @param note the note to create
     * @return the ResponseEntity with status 201 (Created) and with body the new note, or with status 400 (Bad Request) if the note has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notes")
    public ResponseEntity<Note> createNote(@Valid @RequestBody Note note) throws URISyntaxException {
        log.debug("REST request to save Note : {}", note);
        if (note.getId() != null) {
            throw new BadRequestAlertException("A new note cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if (note.getUser().equals(null)) {
            Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
            if (userLogin.isPresent()) {
                Optional<User> user = userRepository.findOneByLogin(userLogin.get());
                note.setUser(user.orElse(null));
            }
        }


        Note result = noteRepository.save(note);
        return ResponseEntity.created(new URI("/api/notes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notes : Updates an existing note.
     *
     * @param note the note to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated note,
     * or with status 400 (Bad Request) if the note is not valid,
     * or with status 500 (Internal Server Error) if the note couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notes")
    public ResponseEntity<Note> updateNote(@Valid @RequestBody Note note) throws URISyntaxException {
        log.debug("REST request to update Note : {}", note);
        if (note.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Note result = noteRepository.save(note);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, note.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notes : get all the notes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of notes in body
     */
    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        log.debug("REST request to get all Notes");
        return noteRepository.findAll();
    }

    /**
     * GET  /notes/:id : get the "id" note.
     *
     * @param id the id of the note to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the note, or with status 404 (Not Found)
     */
    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getNote(@PathVariable Long id) {
        log.debug("REST request to get Note : {}", id);
        Optional<Note> note = noteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(note);
    }

    /**
     * DELETE  /notes/:id : delete the "id" note.
     *
     * @param id the id of the note to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        log.debug("REST request to delete Note : {}", id);
        noteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
