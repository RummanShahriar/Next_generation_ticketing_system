package com.three.ngts.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "seat")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private Long seatId;

    @Column(name = "seat_no")
    private String seatNo;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private BusSchedule busSchedule;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
}
