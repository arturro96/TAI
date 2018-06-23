package pl.edu.tai.projekt.REST.EndpointControllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.tai.projekt.DAO.Event;
import pl.edu.tai.projekt.DAO.User;
import pl.edu.tai.projekt.REST.Requests.AddEventRequest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@RestController
public class EventEndpoint {

    @PersistenceContext
    EntityManager entityManager;

    @GetMapping(path = "/api/eventById/{eventId}", produces = "application/json")
    @Transactional
    public @ResponseBody
    Event getEvent(@PathVariable(name = "eventId", required = true) int eventId){
        Event e = entityManager.find(Event.class, eventId);
        return e;
    }


    @GetMapping(path = "api/events")
    @Transactional
    public @ResponseBody List<?> getEvents() {
        Query q = entityManager
                .createQuery("SELECT DISTINCT e FROM Event e JOIN e.blocks b WHERE b.begin > :currDate")
                .setParameter("currDate", new Date());
        return q.getResultList();
    }

    @PostMapping(path = "teacher/api/addEvent", consumes = "application/json")
    @Transactional
    public @ResponseBody
    Event addEvent(@RequestBody AddEventRequest request) {
        Event e = new Event();

        User eventOwner = entityManager.find(User.class, request.getOwnerId());
        if(eventOwner == null || request.getEventTitle() == null
                || request.getEventTitle().equals("")) {

            return null;
        }

        e.setTitle(request.getEventTitle());
        e.setOwner(eventOwner);

        entityManager.persist(e);
        return e;
    }
}
