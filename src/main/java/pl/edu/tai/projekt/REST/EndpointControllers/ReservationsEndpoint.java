package pl.edu.tai.projekt.REST.EndpointControllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.tai.projekt.DAO.Block;
import pl.edu.tai.projekt.DAO.SlotReservation;
import pl.edu.tai.projekt.DAO.User;
import pl.edu.tai.projekt.REST.Requests.ReservationRequest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

@RestController
public class ReservationsEndpoint {

    @PersistenceContext
    EntityManager entityManager;

    @PostMapping(path = "api/reserveSlot")
    @Transactional
    public ResponseEntity makeReservation(@RequestBody ReservationRequest request) {

        Block b = entityManager.find(Block.class, request.getBlockId());
        User u = entityManager.find(User.class, request.getUserId());
        if(b != null && u !=null) {
            Query q = entityManager
                    .createQuery("SELECT sr FROM SlotReservation sr" +
                            " WHERE sr.rootBlock = :block AND sr.offset = :off")
                    .setParameter("block",b)
                    .setParameter("off", request.getOffset());
            SlotReservation s = (SlotReservation) q.getSingleResult();

            if(s != null && s.getUser() == null){
                System.out.println(s.getReservationId());
                s.setUser(u);
                entityManager.persist(s);
                return ResponseEntity.status(HttpStatus.ACCEPTED)
                        .body("New reservation added\n");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Err\n");
    }
}
