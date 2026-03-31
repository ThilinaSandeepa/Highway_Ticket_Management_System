package lk.ijse.gdse66.microservice.userservice.persistance.repository;

import lk.ijse.gdse66.microservice.userservice.persistance.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/

public interface UserRepository extends JpaRepository<User,String> {
    User findByUserNic(String nic);
    Boolean existsByUserNic(String nic);
    void deleteByUserNic(String nic);
}
