package com.three.ngts.Service;

import com.three.ngts.Entity.Phone;
import com.three.ngts.Repo.PhoneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class PhoneService {

    @Autowired
    private PhoneRepo phoneRepo;

    @PostMapping("/phones/insert")
    public Phone insert(@RequestBody Phone phone) {
        return phoneRepo.save(phone);
    }
}
