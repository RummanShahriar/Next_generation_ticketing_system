package com.three.ngts.Service;

import com.three.ngts.Entity.Seat;
import com.three.ngts.Repo.SeatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class SeatService {

    @Autowired
    private SeatRepo seatRepo;

    @PutMapping("/seats/updateTicket")
    public Seat updateTicket(@RequestBody Seat seat) {
        Seat newSeat = seatRepo.findBySeatId(seat.getSeatId());
        newSeat.setTicket(seat.getTicket());
        return seatRepo.save(newSeat);
    }

    @GetMapping("/seats/averageSeatOccupancy")
    public Double averageSeatOccupancy() {
        List<Seat> seats = seatRepo.findAll();
        int totalSeat = seats.size();
        int totalSold = 0;
        for (Seat seat : seats) {
            if (seat.getTicket() != null) {
                totalSold++;
            }
        }
        Double seatOccupancy = ((double) totalSold / totalSeat) * 100;
        DecimalFormat decimalFormat = new DecimalFormat("#.##");
        String formattedValue = decimalFormat.format(seatOccupancy);
        return Double.parseDouble(formattedValue);
    }
}
