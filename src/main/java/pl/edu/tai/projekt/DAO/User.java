package pl.edu.tai.projekt.DAO;


import org.springframework.boot.autoconfigure.web.ResourceProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int UserId;

    @OneToMany(mappedBy = "user")
    List<SlotReservation> userReservations;

    private String nick;
    private String mail;

    public User(){
        ;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
