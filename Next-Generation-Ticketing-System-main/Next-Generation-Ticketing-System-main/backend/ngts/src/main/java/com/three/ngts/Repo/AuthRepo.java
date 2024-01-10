package com.three.ngts.Repo;

import com.three.ngts.Entity.Auth;
import com.three.ngts.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface AuthRepo extends JpaRepository<Auth, Long> {

    List<Auth> findByUser(User user);

    void deleteByUser(User user);
}
