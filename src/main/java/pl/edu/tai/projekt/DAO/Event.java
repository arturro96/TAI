package pl.edu.tai.projekt.DAO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Entity()
@Table(name = "Event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonSerialize
    private int eventId;

    private String title = null;

    @ManyToOne
    private User owner;

//    @JsonIgnore
    @OneToMany(mappedBy = "rootEvent", cascade = {CascadeType.ALL})
    Collection<Block> blocks;

    {
        blocks = new LinkedList<>();
    }

    public Event() {

    }

    public Event(String title, User owner) {
        this.title = title;
        this.owner = owner;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Collection<Block> getBlocks() {
        return blocks;
    }

    public void setBlocks(Collection<Block> blocks) {
        this.blocks = blocks;
    }

    public void addBlock(Block b){
        b.setRootEvent(this);
        blocks.add(b);
    }

    @Override
    public String toString() {
        return "Event{" +
                "eventId=" + eventId +
                ", title='" + title + '\'' +
                ", owner=" + owner +
                '}';
    }
}
