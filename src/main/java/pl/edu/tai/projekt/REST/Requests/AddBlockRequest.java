package pl.edu.tai.projekt.REST.Requests;

import pl.edu.tai.projekt.DAO.Block;

import java.util.List;

public class AddBlockRequest {

    int eventID = -1;

    List<Block> eventBlocks;

    public AddBlockRequest() {
    }

    public AddBlockRequest(int eventID, List<Block> eventBlocks) {
        this.eventID = eventID;
        this.eventBlocks = eventBlocks;
    }

    public int getEventID() {
        return eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

    public List<Block> getEventBlocks() {
        return eventBlocks;
    }

    public void setEventBlocks(List<Block> eventBlocks) {
        this.eventBlocks = eventBlocks;
    }

    @Override
    public String toString() {
        return "AddBlockRequest{" +
                "eventID=" + eventID +
                ", eventBlocks=" + eventBlocks +
                '}';
    }
}
