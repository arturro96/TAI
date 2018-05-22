package pl.edu.tai.projekt.DAO;

import javax.persistence.*;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Entity()
@Table(name = "Event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int eventId;

    private String title = null;

    @ManyToOne
    private User owner;

    @OneToMany(mappedBy = "rootEvent")
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

}
