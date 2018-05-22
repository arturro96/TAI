package pl.edu.tai.projekt.DAO;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="MeetingBlock")
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int blockId;

    @ManyToOne
    @JoinColumn(name = "eventID")
    Event rootEvent;

    @OneToMany(mappedBy = "rootBlock")
    List<SlotReservation> reservations;

    @Temporal(TemporalType.TIMESTAMP)
    private Date begin;
    @Temporal(TemporalType.TIMESTAMP)
    private Date end;

    private int minPerSlot;

    public Block() {}

    public Block(Date begin, Date end, int minPerSlot) {
        this.begin = begin;
        this.end = end;
        this.minPerSlot = minPerSlot;
    }

    public Event getRootEvent() {
        return rootEvent;
    }

    public void setRootEvent(Event rootEvent) {
        this.rootEvent = rootEvent;
    }

    public Date getBegin() {
        return begin;
    }

    public void setBegin(Date begin) {
        this.begin = begin;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public int getMinPerSlot() {
        return minPerSlot;
    }

    public void setMinPerSlot(int minPerSlot) {
        this.minPerSlot = minPerSlot;
    }
}
