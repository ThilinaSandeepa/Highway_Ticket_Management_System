package lk.ijse.gdse66.microservice.ticketservice.service;

import lk.ijse.gdse66.microservice.ticketservice.dto.TicketDTO;

import java.util.List;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/

public interface TicketService {
    List<TicketDTO> getAllTicket();
    TicketDTO getTicketDetails(String ticket_id);
    TicketDTO saveTicket(TicketDTO ticketDTO);
    void updateTicket(String ticket_id, TicketDTO ticketDTO);
    void deleteTicket(String ticket_id);
}
