package com.three.ngts.Repo;

import com.three.ngts.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DriverReviewRepo extends JpaRepository<DriverReview, Long> {

    List<DriverReview> findAllByTicketAndDriverAndReviewer(Ticket ticket, User user1, User user2);

    List<DriverReview> findAllByDriver(User user);
}
