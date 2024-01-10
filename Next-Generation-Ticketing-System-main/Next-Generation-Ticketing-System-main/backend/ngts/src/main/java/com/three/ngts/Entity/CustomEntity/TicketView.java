package com.three.ngts.Entity.CustomEntity;

import com.three.ngts.Entity.*;
import lombok.Data;

import java.util.List;

@Data
public class TicketView {
    private Ticket ticket;
    private BusSchedule busSchedule;
    private TicketAddress ticketAddress;
    private List<Seat> seats;
    private List<RouteDistrict> routeDistricts;

    public TicketView(Ticket ticket, BusSchedule busSchedule, TicketAddress ticketAddress, List<Seat> seats,
            List<RouteDistrict> routeDistricts) {
        this.ticket = ticket;
        this.busSchedule = busSchedule;
        this.ticketAddress = ticketAddress;
        this.seats = seats;
        this.routeDistricts = routeDistricts;
    }
}
