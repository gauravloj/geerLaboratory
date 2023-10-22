import java.util.*;


class SushiOrderManager {
    private int currentSeat;
    private int totalSeats;
    private ArrayList<Queue<SushiItem>> seats;
    private ArrayList<Integer> seatIds;
    private ArrayList<Integer> servingOrder = new ArrayList<Integer>();

    public SushiOrderManager() {
        this.currentSeat = 0;
        this.totalSeats = 16;
        this.seats = new ArrayList<Queue<SushiItem>>();
        this.seatIds = new ArrayList<Integer>();

        for (int i = 0; i < totalSeats; i++) {
            seats.add(new LinkedList<SushiItem>());
        }
    }

    public void addOrder(ArrayList<SushiOrder> request) {
        for (SushiOrder order : request) {
            int index = order.getSeatId() - 1;
            if (!this.servingOrder.contains(index)) {
                seatIds.add(index);

            }

            for (String roll : order.getMenuItemIds()) {
                seats.get(index).offer(new SushiItem(order.getSeatId(), roll));
            }
        }

        Collections.sort(seatIds);
        seatIds.forEach(seatId -> {
            this.servingOrder.add(seatId);
        });
        seatIds.clear();
    }

    public SushiItem nextItem() {

        if (this.servingOrder.size() > 0) {
            System.out.println("curr -> " + this.currentSeat);
            System.out.println("order -> " + this.servingOrder.size());
            Integer nextSeat = this.servingOrder.get(currentSeat);

            SushiItem item = seats.get(nextSeat).poll();
            if (seats.get(nextSeat).size() == 0) {
                this.servingOrder.remove(currentSeat);
                if ( this.servingOrder.size() == this.currentSeat) {
                    this.currentSeat = 0;
                }

            } else {
                currentSeat += 1;
                currentSeat = currentSeat % this.servingOrder.size();
            }

            return item;
        }

        return null;
    }


}