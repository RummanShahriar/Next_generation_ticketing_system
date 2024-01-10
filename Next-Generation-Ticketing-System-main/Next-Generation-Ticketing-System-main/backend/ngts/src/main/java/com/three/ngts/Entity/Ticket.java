package com.three.ngts.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Long ticketId;

    @Column(name = "purchase_date")
    private java.sql.Timestamp purchaseDate;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private BusSchedule busSchedule;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "refunded")
    private boolean refunded;

    @JsonIgnore
    @OneToMany(mappedBy = "ticket")
    private List<Seat> seats;

    @JsonIgnore
    @OneToMany(mappedBy = "ticket")
    private List<TicketAddress> ticketAddresses;

    @JsonIgnore
    @OneToMany(mappedBy = "ticket")
    private List<BusReview> busReviews;

    @JsonIgnore
    @OneToMany(mappedBy = "ticket")
    private List<DriverReview> driverReviews;
}
