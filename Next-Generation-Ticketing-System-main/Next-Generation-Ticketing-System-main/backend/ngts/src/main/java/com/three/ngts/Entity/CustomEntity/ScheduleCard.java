package com.three.ngts.Entity.CustomEntity;

import com.three.ngts.Entity.BusSchedule;
import com.three.ngts.Entity.RouteDistrict;
import com.three.ngts.Entity.Seat;
import lombok.Data;

import java.util.List;

@Data
public class ScheduleCard {
    private BusSchedule busSchedule;
    private List<Seat> seats;
    private List<RouteDistrict> routeDistricts;

}
