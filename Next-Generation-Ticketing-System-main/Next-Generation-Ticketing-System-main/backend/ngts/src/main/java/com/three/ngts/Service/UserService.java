package com.three.ngts.Service;

import com.three.ngts.Entity.User;
import com.three.ngts.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/users/getUser")
    public User getUser(@RequestBody String userId) {
        return userRepo.findByUserId(Long.parseLong(userId));
    }

    @PostMapping("/users/signup")
    public User signUp(@RequestBody User user) {
        return userRepo.save(user);
    }

    @PostMapping("/users/login")
    public boolean login(@RequestBody User user) {
        try {
            User newUser = userRepo.findUserByEmail(user.getEmail());
            return newUser.getEmail().equals(user.getEmail()) && newUser.getPassword().equals(user.getPassword());
        } catch (Exception e) {
            return false;
        }
    }

    // @DeleteMapping("/users/{userId}")
    // public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
    // Optional<User> optionalUser = userRepo.findById(userId);
    //
    // if (optionalUser.isPresent()) {
    // userRepo.deleteById(userId);
    // return ResponseEntity.ok("User deleted successfully");
    // } else {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    // }
    // }

    @GetMapping("/users/totalUser")
    public Integer totalUser() {
        return userRepo.findAll().size();
    }
}
