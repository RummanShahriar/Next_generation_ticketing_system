package com.three.ngts.Repo;

import com.three.ngts.Entity.Ticket;
import com.three.ngts.Entity.TicketAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface TicketAddressRepo extends JpaRepository<TicketAddress, Long> {
    TicketAddress findByTicket(Ticket ticket);
}
