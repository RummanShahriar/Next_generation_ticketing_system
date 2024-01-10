package com.three.ngts.Service;

import com.three.ngts.Entity.TicketAddress;
import com.three.ngts.Repo.TicketAddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class TicketAddressService {
    @Autowired
    private TicketAddressRepo ticketAddressRepo;

    @PostMapping("/ticketAddresses/insert")
    public TicketAddress insert(@RequestBody TicketAddress ticketAddress) {
        return ticketAddressRepo.save(ticketAddress);
    }
}
