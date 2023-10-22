import java.util.*;


class SushiOrderManager {
    private int currentSeat;
    private ArrayList<Queue<SushiItem>> seats;
    private ArrayList<Integer> seatIds;

    public SushiOrderManager() {
        this.currentSeat = 0;
        this.seats = new ArrayList<Queue<SushiItem>>();
        this.seatIds = new ArrayList<Integer>();

    }

    public void addOrder(ArrayList<SushiOrder> request) {
        HashMap<Integer, SushiOrder> orders = new HashMap<Integer, SushiOrder>();

        for (SushiOrder order : request) {
            seatIds.add(order.getSeatId());
            orders.put(order.getSeatId(), order);
        }


        Collections.sort(seatIds);
        seatIds.forEach(seatId -> {
            SushiOrder order = orders.get(seatId);
            Queue<SushiItem> items = new LinkedList<SushiItem>();
            for (String roll : order.getMenuItemIds()) {
                items.add(new SushiItem(order.getSeatId(), roll));
            }
            seats.add(items);
        });
        seatIds.clear();
    }

    public SushiItem nextItem() {

        if (this.seats.size() > 0) {

            int start = currentSeat - 1;
            boolean isOrderFound = false;

            while (currentSeat < this.seats.size()) {
                isOrderFound = false;
                int nextSeat = this.seats.get(currentSeat).peek().getSeatId();

                for (int j = start ; j >= 0; j--) {
                    if (this.seats.get(j).peek().getSeatId() == nextSeat) {
                        currentSeat += 1;
                        isOrderFound = true;
                        break;
                    }
                }
                if (!isOrderFound) {
                    break;
                }
            }

            if (currentSeat >= this.seats.size()) {
                currentSeat = 0;
            }

            Queue<SushiItem> nextSeat = this.seats.get(currentSeat);
            SushiItem item = nextSeat.poll();
            if (this.seats.get(currentSeat).size() == 0) {
                this.seats.remove(currentSeat);
                if (this.seats.size() == this.currentSeat) {
                    this.currentSeat = 0;
                }

            } else {
                currentSeat += 1;
                currentSeat = currentSeat % this.seats.size();
            }

            return item;


        }



        return null;
    }


}