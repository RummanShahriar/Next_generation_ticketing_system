package com.three.ngts.Service;

import com.three.ngts.Entity.Driver;
import com.three.ngts.Repo.DriverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @PostMapping("/drivers/insert")
    public Driver insert(@RequestBody Driver driver) {
        return driverRepo.save(driver);
    }

    @PostMapping("/drivers/updateExp")
    public Driver updateExp(@RequestBody Driver driver) {
        Driver driver1 = driverRepo.findByUserId(driver.getUserId());
        driver1.setDriverLicenseExp(driver.getDriverLicenseExp());
        return driverRepo.save(driver1);
    }

    @GetMapping("/drivers/totalDriver")
    public Integer totalDriver() {
        return driverRepo.findAll().size();
    }

}
