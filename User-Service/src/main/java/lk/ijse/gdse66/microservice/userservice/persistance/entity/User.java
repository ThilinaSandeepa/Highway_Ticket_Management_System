package lk.ijse.gdse66.microservice.userservice.persistance.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.microservice.userservice.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "user_nic", unique = true, nullable = false)
    private String userNic;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_address", nullable = false)
    private String userAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;
}
