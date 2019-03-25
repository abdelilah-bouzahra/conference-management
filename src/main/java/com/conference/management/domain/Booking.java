package com.conference.management.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "booking_date")
    private Instant bookingDate;

    @Column(name = "arrived_date")
    private Instant arrivedDate;

    @Column(name = "departure_date")
    private Instant departureDate;

    @Column(name = "number_person")
    private Integer numberPerson;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private Room room;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private Invoice invoice;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getBookingDate() {
        return bookingDate;
    }

    public Booking bookingDate(Instant bookingDate) {
        this.bookingDate = bookingDate;
        return this;
    }

    public void setBookingDate(Instant bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Instant getArrivedDate() {
        return arrivedDate;
    }

    public Booking arrivedDate(Instant arrivedDate) {
        this.arrivedDate = arrivedDate;
        return this;
    }

    public void setArrivedDate(Instant arrivedDate) {
        this.arrivedDate = arrivedDate;
    }

    public Instant getDepartureDate() {
        return departureDate;
    }

    public Booking departureDate(Instant departureDate) {
        this.departureDate = departureDate;
        return this;
    }

    public void setDepartureDate(Instant departureDate) {
        this.departureDate = departureDate;
    }

    public Integer getNumberPerson() {
        return numberPerson;
    }

    public Booking numberPerson(Integer numberPerson) {
        this.numberPerson = numberPerson;
        return this;
    }

    public void setNumberPerson(Integer numberPerson) {
        this.numberPerson = numberPerson;
    }

    public Room getRoom() {
        return room;
    }

    public Booking room(Room room) {
        this.room = room;
        return this;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public User getUser() {
        return user;
    }

    public Booking user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public Booking invoice(Invoice invoice) {
        this.invoice = invoice;
        return this;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Booking booking = (Booking) o;
        if (booking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), booking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", bookingDate='" + getBookingDate() + "'" +
            ", arrivedDate='" + getArrivedDate() + "'" +
            ", departureDate='" + getDepartureDate() + "'" +
            ", numberPerson=" + getNumberPerson() +
            "}";
    }
}
