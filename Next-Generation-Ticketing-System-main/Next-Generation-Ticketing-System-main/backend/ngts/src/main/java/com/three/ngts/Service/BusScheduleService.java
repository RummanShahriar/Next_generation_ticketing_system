package com.three.ngts.Service;

import com.three.ngts.Entity.*;
import com.three.ngts.Entity.CustomEntity.DriverRide;
import com.three.ngts.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BusScheduleService {

    @Autowired
    private BusScheduleRepo busScheduleRepo;

    @Autowired
    private SeatRepo seatRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RouteDistrictRepo routeDistrictRepo;

    @PostMapping("/busSchedules/insert")
    public BusSchedule insert(@RequestBody BusSchedule busSchedule) {
        BusSchedule busSchedule1 = busScheduleRepo.save(busSchedule);
        char ch = '@';
        for (int i = 0; i < busSchedule1.getBus().getBusCapacity(); i++) {
            if (i % 4 == 0) {
                ch++;
            }
            Seat seat = new Seat();
            seat.setSeatNo(ch + String.valueOf((i % 4) + 1));
            seat.setBusSchedule(busSchedule1);
            seatRepo.save(seat);
        }

        return busSchedule1;
    }

    @GetMapping("/busSchedules/{userId}")
    public List<DriverRide> getMyRides(@PathVariable Long userId) {
        User user = userRepo.findByUserId(userId);
        List<BusSchedule> busSchedules = busScheduleRepo.findBusSchedulesByDriverOrderByDepartureTime(user);
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        List<BusSchedule> newBusSchedules = busSchedules.stream()
                .filter(schedule -> schedule.getDepartureTime().after(currentTime)).collect(Collectors.toList());
        List<DriverRide> driverRides = new ArrayList<>();
        for (BusSchedule busSchedule : newBusSchedules) {
            List<RouteDistrict> routeDistricts = routeDistrictRepo.findAllByRoute(busSchedule.getRoute());
            Comparator<RouteDistrict> byDistOrder = Comparator.comparing(RouteDistrict::getDistOrder);
            Collections.sort(routeDistricts, byDistOrder);
            DriverRide driverRide = new DriverRide(busSchedule, routeDistricts);
            driverRides.add(driverRide);
        }
        return driverRides;
    }

    @GetMapping("/busSchedules/totalUpcomingRide")
    public Integer totalUpcomingRide() {
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        return busScheduleRepo.findAllByDepartureTimeAfter(currentTime).size();
    }

    @GetMapping("/busSchedules/totalCompletedRide")
    public Integer totalCompletedRide() {
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        return busScheduleRepo.findAllByDepartureTimeBefore(currentTime).size();
    }

}
