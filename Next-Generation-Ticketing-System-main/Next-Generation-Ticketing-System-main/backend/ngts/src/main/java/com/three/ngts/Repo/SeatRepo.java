package com.three.ngts.Repo;

import com.three.ngts.Entity.BusSchedule;
import com.three.ngts.Entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface SeatRepo extends JpaRepository<Seat, Long> {
    List<Seat> findAllByBusSchedule(BusSchedule busSchedule);

    Seat findBySeatId(Long seatId);
}
