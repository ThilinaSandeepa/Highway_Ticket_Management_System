package lk.ijse.gdse66.microservice.vehicleservice.service;

import lk.ijse.gdse66.microservice.vehicleservice.dto.VehicleDTO;

import java.util.List;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/

public interface VehicleService {
    List<VehicleDTO> getAllVehicle();
    VehicleDTO getVehicleDetails(String number);
    VehicleDTO saveVehicle(VehicleDTO vehicleDTO);
    void updateVehicle(String number, VehicleDTO vehicleDTO);
    void deleteVehicle(String number);
}
