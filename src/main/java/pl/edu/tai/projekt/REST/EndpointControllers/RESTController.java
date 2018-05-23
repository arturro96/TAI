package pl.edu.tai.projekt.REST.EndpointControllers;

import com.fasterxml.jackson.databind.util.JSONPObject;
import netscape.javascript.JSObject;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.tai.projekt.DAO.Block;
import pl.edu.tai.projekt.DAO.Event;
import pl.edu.tai.projekt.DAO.User;
import pl.edu.tai.projekt.REST.Requests.AddBlockRequest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
//
//@RestController
//public class RESTController {
//    @PersistenceContext
//    private EntityManager entityManager;
//
//
//
//}
