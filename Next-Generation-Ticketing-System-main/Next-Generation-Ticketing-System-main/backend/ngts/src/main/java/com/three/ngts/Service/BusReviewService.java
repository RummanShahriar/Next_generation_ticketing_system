package com.three.ngts.Service;

import com.three.ngts.Entity.Bus;
import com.three.ngts.Entity.BusReview;
import com.three.ngts.Entity.CustomEntity.TicketView;
import com.three.ngts.Repo.BusReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BusReviewService {

    @Autowired
    private BusReviewRepo busReviewRepo;

    @PostMapping("/busReviews/insert")
    public BusReview insert(@RequestBody BusReview busReview) {
        return busReviewRepo.save(busReview);
    }

    @PostMapping("/busReviews/checkReview")
    public boolean checkReview(@RequestBody TicketView ticketView) {
        List<BusReview> busReviews = busReviewRepo.findAllByTicketAndReviewerAndBus(ticketView.getTicket(),
                ticketView.getTicket().getUser(), ticketView.getBusSchedule().getBus());
        return !busReviews.isEmpty();
    }

    @PostMapping("/busReviews/getBusReview")
    public List<BusReview> getBusReview(@RequestBody Bus bus) {
        return busReviewRepo.findAllByBus(bus);
    }
}
