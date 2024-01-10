package com.three.ngts.Service;

import com.three.ngts.Entity.*;
import com.three.ngts.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class NameService {

    @Autowired
    private NameRepo nameRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthRepo authRepo;

    @Autowired
    private BusScheduleRepo busScheduleRepo;

    @Autowired
    private DriverRepo driverRepo;

    @PostMapping("/names/insert")
    public Name insert(@RequestBody Name name) {
        return nameRepo.save(name);
    }

    @PostMapping("/names/getDriverName")
    public Name getDriverName(@RequestBody User user) {
        return nameRepo.findByUser(user);
    }

    @GetMapping("/names/getAllDriver")
    public List<Name> getAllDriver() {
        List<User> allUsers = userRepo.findAll();
        List<Name> allDriver = new ArrayList<Name>();

        for (User user : allUsers) {
            List<Auth> auths = authRepo.findByUser(user);
            boolean isDriver = false;
            for (Auth auth : auths) {
                if (auth.getType().equals("busDriver")) {
                    isDriver = true;
                    break;
                }
            }
            if (isDriver) {
                allDriver.add(nameRepo.findByUser(user));
            }
        }
        return allDriver;
    }

    @GetMapping("/names/getAllUser")
    public List<User> getAllUser() {
        List<User> allUser = userRepo.findAll();
        List<User> notDriver = new ArrayList<User>();
        for (User user : allUser) {
            List<Auth> auths = authRepo.findByUser(user);
            boolean isDriver = false;
            for (Auth auth : auths) {
                if (auth.getType().equals("busDriver") || auth.getType().equals("admin")) {
                    isDriver = true;
                    break;
                }
            }
            if (!isDriver) {
                notDriver.add(user);
            }
        }
        return notDriver;
    }

    @PostMapping("/names/getFreeDriver")
    public List<Name> getFreeDriver(@RequestBody BusSchedule busScheduleProp) {
        List<User> allUsers = userRepo.findAll();
        List<Name> freeDriver = new ArrayList<Name>();

        for (User user : allUsers) {
            List<Auth> auths = authRepo.findByUser(user);
            boolean isDriver = false;
            for (Auth auth : auths) {
                if (auth.getType().equals("busDriver")) {
                    isDriver = true;
                    break;
                }
            }
            if (isDriver) {
                Driver driver = driverRepo.findByUserId(user);
                if (driver.getDriverLicenseExp().before(busScheduleProp.getArrivalTime())) {
                    isDriver = false;
                }
            }
            if (isDriver) {
                List<BusSchedule> busSchedules = busScheduleRepo.findBusSchedulesByDriver(user);
                boolean hasScheduleClash = false;
                for (BusSchedule busSchedule : busSchedules) {
                    if (!((busSchedule.getDepartureTime().before(busScheduleProp.getDepartureTime())
                            && busSchedule.getArrivalTime().before(busScheduleProp.getArrivalTime()))
                            || (busSchedule.getDepartureTime().after(busScheduleProp.getDepartureTime())
                                    && busSchedule.getArrivalTime().after(busScheduleProp.getArrivalTime())))) {
                        hasScheduleClash = true;
                        break;
                    }
                }
                if (!hasScheduleClash) {
                    freeDriver.add(nameRepo.findByUser(user));
                }
            }
        }
        return freeDriver;
    }
}
