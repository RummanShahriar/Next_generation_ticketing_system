package com.three.ngts.Entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "driver_review")
public class DriverReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "d_review_id")
    private Long dReviewId;

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
    @JoinColumn(name = "driver_id")
    private User driver;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
}
