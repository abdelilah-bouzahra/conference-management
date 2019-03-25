package com.conference.management.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.conference.management.domain.enumeration.RoomType;

import com.conference.management.domain.enumeration.RoomState;

/**
 * A Room.
 */
@Entity
@Table(name = "room")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "number_room")
    private Integer numberRoom;

    @Column(name = "number_floor")
    private Integer numberFloor;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type")
    private RoomType roomType;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_state")
    private RoomState roomState;

    @ManyToOne
    @JsonIgnoreProperties("rooms")
    private Hotel hotel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumberRoom() {
        return numberRoom;
    }

    public Room numberRoom(Integer numberRoom) {
        this.numberRoom = numberRoom;
        return this;
    }

    public void setNumberRoom(Integer numberRoom) {
        this.numberRoom = numberRoom;
    }

    public Integer getNumberFloor() {
        return numberFloor;
    }

    public Room numberFloor(Integer numberFloor) {
        this.numberFloor = numberFloor;
        return this;
    }

    public void setNumberFloor(Integer numberFloor) {
        this.numberFloor = numberFloor;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public Room roomType(RoomType roomType) {
        this.roomType = roomType;
        return this;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public RoomState getRoomState() {
        return roomState;
    }

    public Room roomState(RoomState roomState) {
        this.roomState = roomState;
        return this;
    }

    public void setRoomState(RoomState roomState) {
        this.roomState = roomState;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public Room hotel(Hotel hotel) {
        this.hotel = hotel;
        return this;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
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
        Room room = (Room) o;
        if (room.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), room.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", numberRoom=" + getNumberRoom() +
            ", numberFloor=" + getNumberFloor() +
            ", roomType='" + getRoomType() + "'" +
            ", roomState='" + getRoomState() + "'" +
            "}";
    }
}
