package com.three.ngts.Entity.CustomEntity;

import com.three.ngts.Entity.BusSchedule;
import com.three.ngts.Entity.RouteDistrict;
import lombok.Data;

import java.util.List;

@Data
public class DriverRide {
    private BusSchedule busSchedule;
    private List<RouteDistrict> routeDistricts;

    public DriverRide(BusSchedule busSchedule, List<RouteDistrict> routeDistricts) {
        this.busSchedule = busSchedule;
        this.routeDistricts = routeDistricts;
    }
}
