package pl.edu.tai.projekt.DAO;

import javax.persistence.*;
import java.util.List;

@Entity
public class SlotReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reservationId;

    @ManyToOne
    @JoinColumn(name="blockId")
    Block rootBlock;

//  beginOfSlot = Block.begin + offset*Block.minPerSlot
    private int offset;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "userId")
    private User user;

    public SlotReservation(){

    }

    public SlotReservation(Block rootBlock, int offset, User user) {
        this.rootBlock = rootBlock;
        this.offset = offset;
        this.user = user;
    }

    public Block getRootBlock() {
        return rootBlock;
    }

    public void setRootBlock(Block rootBlock) {
        this.rootBlock = rootBlock;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    @Override
    public String toString() {
        return "SlotReservation{" +
                "reservationId=" + reservationId +
                ", rootBlock=" + rootBlock +
                ", offset=" + offset +
                ", user=" + user +
                '}';
    }
}
