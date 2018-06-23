package pl.edu.tai.projekt.REST.EndpointControllers;

import org.aspectj.weaver.patterns.ConcreteCflowPointcut;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.tai.projekt.DAO.Block;
import pl.edu.tai.projekt.DAO.Event;
import pl.edu.tai.projekt.DAO.SlotReservation;
import pl.edu.tai.projekt.REST.Requests.AddBlockRequest;

import javax.management.Query;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Calendar;
import java.util.Date;

@RestController
public class BlockEndpoint {

    @PersistenceContext
    EntityManager entityManager;

    @PostMapping(path = "teacher/api/addBlock", consumes = "application/json")
    @Transactional
    public @ResponseBody Iterable<Block> addBlock(@RequestBody AddBlockRequest request) {
        System.out.println("Date: " + new Date().toString());
        Event e = entityManager.find(Event.class, request.getEventID());

        if(e==null || request.getEventBlocks() == null
                || request.getEventBlocks().isEmpty()) {
            System.out.println("null");
            return null;
        }

        for(Block b : request.getEventBlocks()) {
            System.out.println("New blocks");
//             begin > currentTime && begin < end && minPerSlot >= 1 min
//            System.out.println("New block added");
            if(b.getBegin().after(new Date())
                    && b.getEnd().after(b.getBegin())
                    && b.getMinPerSlot() > 0) {

                int no = 0;
                int mps = b.getMinPerSlot();
                System.out.println("b.getBegin().toInstant().plusSeconds(60*mps).toString()= " + b.getBegin().toInstant().plusSeconds(60*mps).toString());
                Date nextSlot =
                        new Date(b.getBegin().getTime()+(60000*mps));

                while(nextSlot.before(b.getEnd())) {
                    SlotReservation sr = new SlotReservation(b,no,null);
                    entityManager.persist(sr);
                    nextSlot= new Date(nextSlot.getTime() +(60000*mps));
                    System.out.println("Next slot "+ nextSlot.toString());
                    no++;
                }

                e.addBlock(b);
            }
        }

        return e.getBlocks();
    }

}
