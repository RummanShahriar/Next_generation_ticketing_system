package com.three.ngts.Service;

import com.three.ngts.Entity.Auth;
import com.three.ngts.Entity.User;
import com.three.ngts.Repo.AuthRepo;
import com.three.ngts.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class AuthService {

    @Autowired
    private AuthRepo authRepo;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/auths/insert")
    public Auth insert(@RequestBody Auth auth) {
        return authRepo.save(auth);
    }

    @PostMapping("/auths/update")
    public Auth update(@RequestBody User user) {
        List<Auth> auths = authRepo.findByUser(user);
        Auth auth = auths.get(0);
        auth.setType("busDriver");
        return authRepo.save(auth);
    }

    @GetMapping("/auths/getAllDriver")
    public List<User> getAllDriver() {
        List<Auth> auths = authRepo.findAll();
        List<User> drivers = new ArrayList<>();

        for (Auth auth : auths) {
            if (auth.getType().equals("busDriver")) {
                drivers.add(auth.getUser());
            }
        }
        return drivers;
    }

    @GetMapping("/auths/totalPassenger")
    public Integer totalPassenger() {
        List<Auth> auths = authRepo.findAll();
        Integer count = 0;
        for (Auth auth : auths) {
            if (auth.getType().equals("general")) {
                count++;
            }
        }
        return count;
    }

    @DeleteMapping("/auths/{userId}")
    public ResponseEntity<String> deleteDriver(@PathVariable Long userId) {
        Optional<User> optionalUser = userRepo.findById(userId);

        if (optionalUser.isPresent()) {
            List<Auth> auths = authRepo.findByUser(optionalUser.get());
            for (Auth auth : auths) {
                if (auth.getType().equals("busDriver")) {
                    auth.setType("general");
                    authRepo.save(auth);
                }
            }
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
