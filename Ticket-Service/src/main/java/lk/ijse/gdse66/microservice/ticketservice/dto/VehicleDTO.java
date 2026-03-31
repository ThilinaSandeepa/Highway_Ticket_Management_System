package lk.ijse.gdse66.microservice.ticketservice.dto;

import jakarta.validation.constraints.NotBlank;
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
public class VehicleDTO {
    @NotBlank
    private String vehicleNumber;
    @NotBlank
    private String vehicleModel;
    @NotBlank
    private String userNic;
}
