package com.three.ngts.Repo;

import com.three.ngts.Entity.Name;
import com.three.ngts.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface NameRepo extends JpaRepository<Name, Long> {
    Name findByUser(User user);
}
