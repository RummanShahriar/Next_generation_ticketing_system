package com.three.ngts.Service;

import com.three.ngts.Entity.RouteDistrict;
import com.three.ngts.Repo.RouteDistrictRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class RouteDistrictService {

    @Autowired
    private RouteDistrictRepo routeDistrictRepo;

    @PostMapping("/routeDistricts/insert")
    public RouteDistrict insert(@RequestBody RouteDistrict routeDistrict) {
        return routeDistrictRepo.save(routeDistrict);
    }

    @GetMapping("/routeDistricts/getAll")
    public List<RouteDistrict> getAll() {
        return routeDistrictRepo.findAll();
    }
}
