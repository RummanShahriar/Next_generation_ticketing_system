package com.three.ngts.Repo;

import com.three.ngts.Entity.District;
import com.three.ngts.Entity.Route;
import com.three.ngts.Entity.RouteDistrict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface RouteDistrictRepo extends JpaRepository<RouteDistrict, Long> {

    List<RouteDistrict> findAllByDistrict(District district);

    List<RouteDistrict> findAllByRoute(Route route);
}
