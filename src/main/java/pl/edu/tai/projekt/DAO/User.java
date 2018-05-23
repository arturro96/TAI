package pl.edu.tai.projekt.DAO;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.boot.autoconfigure.web.ResourceProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer UserId;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    List<SlotReservation> userReservations;

    private String nick;
    private String mail;

    public User(){
        ;
    }

    public User(String nick, String mail) {
        this.nick = nick;
        this.mail = mail;
    }

    public User(List<SlotReservation> userReservations, String nick, String mail) {
        this.userReservations = userReservations;
        this.nick = nick;
        this.mail = mail;
    }

    public int getUserId() {
        return UserId;
    }

    public List<SlotReservation> getUserReservations() {
        return userReservations;
    }

    public void setUserReservations(List<SlotReservation> userReservations) {
        this.userReservations = userReservations;
    }

    public void setUserId(Integer userId) {
        UserId = userId;
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

    @Override
    public String toString() {
        return "User{" +
                "UserId=" + UserId +
                ", userReservations=" + userReservations +
                ", nick='" + nick + '\'' +
                ", mail='" + mail + '\'' +
                '}';
    }
}
