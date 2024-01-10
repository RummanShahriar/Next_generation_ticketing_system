package com.three.ngts.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "district")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dist_id")
    private Long distId;

    @Column(name = "dist_name")
    private String distName;

    @JsonIgnore
    @OneToMany(mappedBy = "district")
    private List<RouteDistrict> routeDistricts;

    @JsonIgnore
    @OneToMany(mappedBy = "source")
    private List<TicketAddress> ticketAddresses;

    @JsonIgnore
    @OneToMany(mappedBy = "destination")
    private List<TicketAddress> ticketAddresses1;
}
