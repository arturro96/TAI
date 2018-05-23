package pl.edu.tai.projekt.REST.Requests;

import pl.edu.tai.projekt.DAO.Block;
import pl.edu.tai.projekt.DAO.Event;

import java.util.List;

public class AddEventRequest {
    int ownerId;
    String eventTitle;
//    List<Block> eventBlock;

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

//    public List<Block> getEventBlock() {
//        return eventBlock;
//    }
//
//    public void setEventBlock(List<Block> eventBlock) {
//        this.eventBlock = eventBlock;
//    }
}
