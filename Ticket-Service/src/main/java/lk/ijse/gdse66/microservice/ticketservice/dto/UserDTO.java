package lk.ijse.gdse66.microservice.ticketservice.dto;

import jakarta.validation.constraints.NotBlank;
import lk.ijse.gdse66.microservice.ticketservice.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @NotBlank
    private Gender gender;
}
