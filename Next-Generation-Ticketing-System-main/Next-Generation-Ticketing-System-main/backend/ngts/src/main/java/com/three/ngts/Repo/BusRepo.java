package com.three.ngts.Repo;

import com.three.ngts.Entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface BusRepo extends JpaRepository<Bus, Long> {
    List<Bus> findByBusNo(String busNo);
}
