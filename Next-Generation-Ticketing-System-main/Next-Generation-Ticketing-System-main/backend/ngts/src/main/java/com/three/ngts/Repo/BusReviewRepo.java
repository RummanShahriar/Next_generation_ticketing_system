package com.three.ngts.Repo;

import com.three.ngts.Entity.Bus;
import com.three.ngts.Entity.BusReview;
import com.three.ngts.Entity.Ticket;
import com.three.ngts.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface BusReviewRepo extends JpaRepository<BusReview, Long> {
    List<BusReview> findAllByTicketAndReviewerAndBus(Ticket ticket, User user, Bus bus);

    List<BusReview> findAllByBus(Bus bus);
}
