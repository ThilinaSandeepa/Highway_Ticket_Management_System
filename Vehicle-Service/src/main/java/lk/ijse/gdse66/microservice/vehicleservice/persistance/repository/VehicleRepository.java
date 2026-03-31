package lk.ijse.gdse66.microservice.vehicleservice.persistance.repository;

import lk.ijse.gdse66.microservice.vehicleservice.persistance.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/

public interface VehicleRepository extends JpaRepository<Vehicle,String> {
    Vehicle findByVehicleNumber(String number);
    Boolean existsByVehicleNumber(String number);
    void deleteByVehicleNumber(String number);
}
