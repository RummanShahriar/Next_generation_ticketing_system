package com.three.ngts.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "address")
    private String address;

    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private Name name;

    @JsonIgnore
    @OneToMany(mappedBy = "userId")
    private List<Phone> phone;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Auth> auths;

    @JsonIgnore
    @OneToOne(mappedBy = "userId")
    private Driver driver;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Ticket> tickets;

    @JsonIgnore
    @OneToMany(mappedBy = "driver")
    private List<BusSchedule> busSchedules;

    @JsonIgnore
    @OneToMany(mappedBy = "reviewer")
    private List<DriverReview> driverReviewer;

    @JsonIgnore
    @OneToMany(mappedBy = "driver")
    private List<DriverReview> driverReviews;

    @JsonIgnore
    @OneToMany(mappedBy = "reviewer")
    private List<BusReview> busReviewer;
}
