package pl.edu.tai.projekt.REST;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@RestController
public class RESTController {
    @PersistenceContext
    private EntityManager entityManager;

//    {
//        entityManager.getTransaction().begin();
//        Slot s = new Slot();
//        s.setBegin(new Date());
//        s.setMinPerSlot(100);
//        entityManager.persist(s);
//        entityManager.getTransaction().commit();
//    }

    @GetMapping(path = "/Slots", produces = "application/json")
    @Transactional
    public @ResponseBody String getHello(){
//        System.out.println("ID" + );


//        System.out.println("" + (q != null ? q : "pusto"));
//        List a = new LinkedList();
//        a.add(s);
        return "Hi";
    }

}
