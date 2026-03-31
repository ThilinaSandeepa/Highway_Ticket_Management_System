package lk.ijse.gdse66.microservice.ticketservice.persistance.repository;

import lk.ijse.gdse66.microservice.ticketservice.persistance.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author: Vishal Sandakelum,
 * @Runtime version: 11.0.11+9-b1341.60 amd64
 **/

public interface TicketRepository extends JpaRepository<Ticket,String> {
    Ticket findByTicketId(String ticket_id);
    Boolean existsByTicketId(String ticket_id);
    void deleteByTicketId(String ticket_id);
}
