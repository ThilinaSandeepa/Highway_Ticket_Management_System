package lk.ijse.gdse66.microservice.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lk.ijse.gdse66.microservice.userservice.util.Gender;
import lombok.*;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    @NotBlank
    private String userNic;
    @NotBlank
    private String userName;
    @NotBlank
    private String userAddress;
    @NotNull
    private Gender gender;
}
