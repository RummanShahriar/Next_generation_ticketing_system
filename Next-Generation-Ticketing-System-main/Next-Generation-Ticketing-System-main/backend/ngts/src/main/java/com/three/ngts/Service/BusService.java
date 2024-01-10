package com.three.ngts.Service;

import com.three.ngts.Entity.Bus;
import com.three.ngts.Entity.BusSchedule;
import com.three.ngts.Repo.BusRepo;
import com.three.ngts.Repo.BusScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BusService {

    @Autowired
    private BusRepo busRepo;

    @Autowired
    private BusScheduleRepo busScheduleRepo;

    @PostMapping("/buses/insert")
    public Bus insert(@RequestBody Bus bus) {
        return busRepo.save(bus);
    }

    @PostMapping("/buses/getFreeBuses")
    public List<Bus> getFreeBuses(@RequestBody BusSchedule busSchedule) {
        List<BusSchedule> busSchedules = busScheduleRepo.findAll();
        List<Bus> allBuses = busRepo.findAll();
        List<Bus> freeBuses = new ArrayList<Bus>();
        ;
        List<Bus> busyBuses = new ArrayList<Bus>();
        for (BusSchedule busS : busSchedules) {
            if (!((busS.getDepartureTime().before(busSchedule.getDepartureTime())
                    && busS.getArrivalTime().before(busSchedule.getArrivalTime()))
                    || (busS.getDepartureTime().after(busSchedule.getDepartureTime())
                            && busS.getArrivalTime().after(busSchedule.getArrivalTime())))) {
                busyBuses.add(busS.getBus());
            }
        }
        for (Bus bus : allBuses) {
            if (!busyBuses.contains(bus)) {
                freeBuses.add(bus);
            }
        }
        return freeBuses;
    }

    @GetMapping("/buses/getAllBus")
    public List<Bus> getAllBus() {
        return busRepo.findAll();
    }

    @DeleteMapping("/buses/{busId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long busId) {
        Optional<Bus> optionalBus = busRepo.findById(busId);

        if (optionalBus.isPresent()) {
            busRepo.deleteById(busId);
            return ResponseEntity.ok("Bus deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bus not found");
        }
    }
}
