package lk.ijse.gdse66.microservice.payementservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lk.ijse.gdse66.microservice.payementservice.util.Status;
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
public class PaymentDTO {
    @NotBlank
    private String paymentId;
    @NotBlank
    private String ticketId;
    @NotNull
    private Double amount;
    @NotBlank
    private String date;
    @NotNull
    private Status status;
}
