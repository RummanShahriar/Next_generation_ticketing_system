package com.three.ngts.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "driver")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id")
    private Long driverId;

    @Column(name = "driver_license_no")
    private String driverLicenseNo;

    @Column(name = "driver_license_exp")
    private Date driverLicenseExp;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User userId;
}
