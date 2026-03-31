package lk.ijse.gdse66.microservice.vehicleservice.api;

import jakarta.validation.Valid;
import lk.ijse.gdse66.microservice.vehicleservice.dto.UserDTO;
import lk.ijse.gdse66.microservice.vehicleservice.dto.VehicleDTO;
import lk.ijse.gdse66.microservice.vehicleservice.service.VehicleService;
import lk.ijse.gdse66.microservice.vehicleservice.service.execption.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/

@RestController
@RequestMapping("api/v0/vehicle")
public class VehicleAPI {
    private final VehicleService vehicleService;

    public VehicleAPI(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    List<VehicleDTO> getAllVehicle(){
        return vehicleService.getAllVehicle();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    VehicleDTO saveVehicle(@Valid @RequestBody VehicleDTO vehicleDTO){
        try {
            UserDTO reponse = restTemplate.getForObject("http://user-service/api/v0/users/"+vehicleDTO.getUserNic(), UserDTO.class);
            System.out.println(reponse.getUserNic());
            return vehicleService.saveVehicle(vehicleDTO);
        }catch (Exception e){
            throw new BadRequestException("This User : "+ vehicleDTO.getUserNic()+ " Not Exicts!");
        }
    }

    @PutMapping(value = "/{number}",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    void updateVehicle(@Valid @RequestBody VehicleDTO vehicleDTO,@PathVariable("number") String number){
        try {
            UserDTO reponse = restTemplate.getForObject("http://user-service/api/v0/users/"+vehicleDTO.getUserNic(), UserDTO.class);
            vehicleService.updateVehicle(number,vehicleDTO);
        }catch (Exception e){
            throw new BadRequestException("This User : "+ vehicleDTO.getUserNic()+ " Not Exicts!");
        }
    }

    @DeleteMapping(value = "/{number}",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    void deleteVehicle(@PathVariable("number") String number){
        vehicleService.deleteVehicle(number);
    }

    @GetMapping(value = "/{number}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    VehicleDTO getVehicle(@PathVariable("number") String number){
        return vehicleService.getVehicleDetails(number);
    }
}
