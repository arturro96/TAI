package pl.edu.tai.projekt.REST.Requests;

public class ReservationRequest {
    int userId;
    int blockId;
    int offset;

    public int getUserId() {
        return userId;
    }

    public int getBlockId() {
        return blockId;
    }

    public int getOffset() {
        return offset;
    }
}
