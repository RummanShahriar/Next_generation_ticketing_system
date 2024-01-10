package com.three.ngts.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "route")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "route_id")
    private Long routeId;

    @JsonIgnore
    @OneToMany(mappedBy = "route")
    private List<RouteDistrict> routeDistricts;

    @JsonIgnore
    @OneToMany(mappedBy = "route")
    private List<BusSchedule> busSchedules;
}
