package com.three.ngts.Service;

import com.three.ngts.Entity.*;
import com.three.ngts.Entity.CustomEntity.TicketView;
import com.three.ngts.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class TicketService {

    @Autowired
    private TicketRepo ticketRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private SeatRepo seatRepo;

    @Autowired
    private TicketAddressRepo ticketAddressRepo;

    @Autowired
    private RouteDistrictRepo routeDistrictRepo;

    @PostMapping("/tickets/insert")
    public Ticket insert(@RequestBody Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    @PostMapping("/tickets/getMyTickets")
    public List<TicketView> getMyTickets(@RequestBody String userId) {
        List<TicketView> ticketViews = new ArrayList<TicketView>();
        User user = userRepo.findByUserId(Long.parseLong(userId));
        List<Ticket> tickets = ticketRepo.findByUser(user);
        Collections.sort(tickets, Comparator.comparing(Ticket::getPurchaseDate));
        Collections.reverse(tickets);
        for (Ticket ticket : tickets) {
            BusSchedule busSchedule = ticket.getBusSchedule();
            TicketAddress ticketAddress = ticketAddressRepo.findByTicket(ticket);
            List<Seat> seatsTemp = seatRepo.findAllByBusSchedule(busSchedule);
            List<Seat> seats = new ArrayList<Seat>();
            for (Seat seat : seatsTemp) {
                if (seat.getTicket() != null && seat.getTicket() == ticket) {
                    seats.add(seat);
                }
            }
            List<RouteDistrict> routeDistricts = routeDistrictRepo.findAllByRoute(busSchedule.getRoute());
            TicketView ticketView = new TicketView(ticket, busSchedule, ticketAddress, seats, routeDistricts);
            ticketViews.add(ticketView);
        }
        return ticketViews;
    }

    @PostMapping("/tickets/getRefund")
    public List<TicketView> getRefund(@RequestBody TicketView ticketView) {
        List<Seat> seats = ticketView.getSeats();
        for (Seat seat : seats) {
            seat.setTicket(null);
            seatRepo.save(seat);
        }
        User user = ticketView.getTicket().getUser();
        Ticket ticket = ticketView.getTicket();
        ticket.setRefunded(true);
        ticketRepo.save(ticket);
        return getMyTickets(user.getUserId().toString());
    }

    // @PostMapping("/tickets/getRefund")
    // public List<TicketView> getRefund(@RequestBody TicketView ticketView) {
    // List<Seat> seats = ticketView.getSeats();
    // for (Seat seat : seats) {
    // seat.setTicket(null);
    // seatRepo.save(seat);
    // }
    // for(BusReview busReview: ticketView.getTicket().getBusReviews()){
    // busReview.setTicket(null);
    // busReviewRepo.save(busReview);
    // }
    // for(DriverReview driverReview: ticketView.getTicket().getDriverReviews()){
    // driverReview.setTicket(null);
    // driverReviewRepo.save(driverReview);
    // }
    // User user = ticketView.getTicket().getUser();
    // Ticket ticket = ticketView.getTicket();
    // ticket.setRefunded(true);
    // ticketRepo.save(ticket);
    // return getMyTickets(user.getUserId().toString());
    // }

    @GetMapping("/tickets/totalTicket")
    public Integer totalTicket() {
        List<Ticket> tickets = ticketRepo.findAll();
        Integer totalTicket = 0;
        for (Ticket ticket : tickets) {
            if (!ticket.isRefunded()) {
                totalTicket++;
            }
        }
        return totalTicket;
    }
}
