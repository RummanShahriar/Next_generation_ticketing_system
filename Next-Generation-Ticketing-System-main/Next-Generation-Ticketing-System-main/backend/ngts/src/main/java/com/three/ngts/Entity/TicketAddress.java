package com.three.ngts.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ticket_address")
public class TicketAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_address_id")
    private Long ticketAddressId;

    @ManyToOne
    @JoinColumn(name = "source", nullable = false)
    private District source;

    @ManyToOne
    @JoinColumn(name = "destination", nullable = false)
    private District destination;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;
}
