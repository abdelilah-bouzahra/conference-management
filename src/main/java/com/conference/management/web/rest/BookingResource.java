package com.conference.management.web.rest;
import com.conference.management.domain.Booking;
import com.conference.management.domain.User;
import com.conference.management.repository.BookingRepository;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Booking.
 */
@RestController
@RequestMapping("/api")
public class BookingResource {

    private final Logger log = LoggerFactory.getLogger(BookingResource.class);

    private static final String ENTITY_NAME = "booking";

    private final BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    public BookingResource(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    /**
     * POST  /bookings : Create a new booking.
     *
     * @param booking the booking to create
     * @return the ResponseEntity with status 201 (Created) and with body the new booking, or with status 400 (Bad Request) if the booking has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) throws URISyntaxException {
        log.debug("REST request to save Booking : {}", booking);
        if (booking.getId() != null) {
            throw new BadRequestAlertException("A new booking cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Optional<String> userLogin = SecurityUtils.getCurrentUserLogin();
        if (userLogin.isPresent()) {
            Optional<User> user = userRepository.findOneByLogin(userLogin.get());
            booking.setUser(user.orElse(null));
        }

        Booking result = bookingRepository.save(booking);
        return ResponseEntity.created(new URI("/api/bookings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bookings : Updates an existing booking.
     *
     * @param booking the booking to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated booking,
     * or with status 400 (Bad Request) if the booking is not valid,
     * or with status 500 (Internal Server Error) if the booking couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bookings")
    public ResponseEntity<Booking> updateBooking(@RequestBody Booking booking) throws URISyntaxException {
        log.debug("REST request to update Booking : {}", booking);
        if (booking.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Booking result = bookingRepository.save(booking);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, booking.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bookings : get all the bookings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bookings in body
     */
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        log.debug("REST request to get all Bookings");
        return bookingRepository.findAll();
    }

    /**
     * GET  /bookings/:id : get the "id" booking.
     *
     * @param id the id of the booking to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the booking, or with status 404 (Not Found)
     */
    @GetMapping("/bookings/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id) {
        log.debug("REST request to get Booking : {}", id);
        Optional<Booking> booking = bookingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(booking);
    }

    /**
     * DELETE  /bookings/:id : delete the "id" booking.
     *
     * @param id the id of the booking to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        log.debug("REST request to delete Booking : {}", id);
        bookingRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
