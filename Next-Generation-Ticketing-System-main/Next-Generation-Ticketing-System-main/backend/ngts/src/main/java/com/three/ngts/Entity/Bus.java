package com.three.ngts.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "bus")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bus_id")
    private Long busId;

    @Column(name = "bus_no")
    private String busNo;

    @Column(name = "bus_type")
    private String busType;

    @Column(name = "bus_capacity")
    private Long busCapacity;

    @JsonIgnore
    @OneToMany(mappedBy = "bus")
    private List<BusSchedule> busSchedules;

    @JsonIgnore
    @OneToMany(mappedBy = "bus")
    private List<BusReview> busReviews;
}
