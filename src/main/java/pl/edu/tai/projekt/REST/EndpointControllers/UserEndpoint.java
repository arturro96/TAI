package pl.edu.tai.projekt.REST.EndpointControllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.tai.projekt.DAO.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;


@RestController
public class UserEndpoint {
    @PersistenceContext
    EntityManager entityManager;


    @PostMapping(path = "api/addUser", consumes = "application/json")
    @Transactional
    public @ResponseBody
    ResponseEntity<User> addUser(@RequestBody User request) {
        request.setUserReservations(new ArrayList<>());

        if(request.getNick() == null || request.getMail() == null) {
            return ResponseEntity.badRequest().build();
        }

        boolean nickOrMailTaken = entityManager
                .createQuery("FROM User u WHERE u.nick = :nick OR u.mail = :mail")
                .setParameter("nick", request.getNick())
                .setParameter("mail", request.getMail())
                .getResultList().size() > 0;

        if(nickOrMailTaken) {
            System.out.println("Nick or mail taken");
            return ResponseEntity.badRequest().body(null);
        }

        request.setUserId(null);
        entityManager.persist(request);
        System.out.println("XDDD \n\t ");
        return ResponseEntity.ok(request);
    }

}
