package com.three.ngts.Service;

import com.three.ngts.Entity.Route;
import com.three.ngts.Repo.RouteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class RouteService {

    @Autowired
    private RouteRepo routeRepo;

    @PostMapping("/routes/insert")
    public Route insert(@RequestBody Route route) {
        return routeRepo.save(route);
    }

    @GetMapping("/routes/getRoutes")
    public List<Route> getRoutes() {
        return routeRepo.findAll();
    }

    @GetMapping("/routes/totalRoute")
    public Integer totalRoute() {
        return routeRepo.findAll().size();
    }
}
