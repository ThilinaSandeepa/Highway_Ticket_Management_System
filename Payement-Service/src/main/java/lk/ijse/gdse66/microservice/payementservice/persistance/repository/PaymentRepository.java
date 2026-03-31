package lk.ijse.gdse66.microservice.payementservice.persistance.repository;

import lk.ijse.gdse66.microservice.payementservice.persistance.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/

public interface PaymentRepository extends JpaRepository<Payment,String> {
    Payment findByPaymentId(String paymentId);
    Boolean existsByPaymentId(String paymentId);
    void deleteByPaymentId(String paymentId);
}
