package com.three.ngts.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "bus_schedule")
public class BusSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;

    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;

    @Column(name = "departure_time")
    private java.sql.Timestamp departureTime;

    @Column(name = "arrival_time")
    private java.sql.Timestamp arrivalTime;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;

    @JsonIgnore
    @OneToMany(mappedBy = "busSchedule")
    private List<Ticket> tickets;

    @JsonIgnore
    @OneToMany(mappedBy = "busSchedule")
    private List<Seat> seats;
}
