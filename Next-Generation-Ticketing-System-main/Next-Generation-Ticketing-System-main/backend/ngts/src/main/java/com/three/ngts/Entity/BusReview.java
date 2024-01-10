package com.three.ngts.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "bus_review")
public class BusReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "b_review_id")
    private Long bReviewId;

    @Column(name = "review_point")
    private BigDecimal reviewPoint;

    @Column(name = "review_text")
    private String reviewText;

    @Column(name = "review_date")
    private java.sql.Timestamp reviewDate;

    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private User reviewer;

    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
}
