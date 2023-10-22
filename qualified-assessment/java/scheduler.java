import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

final public class ChefScheduler {

    private static final int DAYS_COUNT = 7;

    public static boolean schedulable(HashMap<String, ArrayList<String>> requests) {

        requests.entrySet().forEach(set -> {
            System.out.println("--> " + set.getKey());
            set.getValue().forEach(System.out::println);
        });

        HashMap<String, Integer> chefsCount = new HashMap<String, Integer>();
        HashMap<Integer, ArrayList<String>> dayOffCount = new HashMap<Integer, ArrayList<String>>();
        ArrayList<ArrayList<String>> weekSchedule = new ArrayList<ArrayList<String>>();
        HashMap<String, Integer> daysIndices = new HashMap<String, Integer>();

        initializeDaysOffCount(dayOffCount);
        initializeDaysIndices(daysIndices);
        initializeSchedule(weekSchedule);
        initializeChefsCount(requests.keySet(), chefsCount);

        // Map the number of daysOff requested with the list of chefs who
        // requested that many number of leaves
        requests.keySet().forEach(chef -> {
            int count = requests.get(chef).size();
            dayOffCount.get(count).add(chef);
        });

        // For each dayOff count, assign the respective chef on the
        // remaining days. Loop will iterate in descending order
        // to ensure that the person taking most leaves gets assigned first
        // A check is in place to ensure that not more than 5 days are assigned
        // to any chef and each days has at least 2 unique chefs
        for (int i = 6; i >= 0; i--) {
            ArrayList<String> chefs = dayOffCount.get(i);
            chefs.forEach(chef -> {
                HashSet<String> daysOffSet = new HashSet<String>(requests.get(chef));
                daysIndices.keySet().forEach(day -> {
                    if (!daysOffSet.contains(day) && weekSchedule.get(daysIndices.get(day)).size() < 2) {
                        int count = chefsCount.get(chef) + 1;
                        if (count < 6) {
                            chefsCount.put(chef, count);
                            weekSchedule.get(daysIndices.get(day)).add(chef);
                        }
                    }
                });
            });
        }

        return validateSchedule(chefsCount, weekSchedule);
    }

    // If number of chefs per day is >= 2 then the schedule is valid else invalid
    private static boolean validateSchedule(HashMap<String, Integer> chefsCount,
            ArrayList<ArrayList<String>> weekSchedule) {

        for (ArrayList<String> daySchedule : weekSchedule) {
            if (daySchedule.size() < 2) {
                return false;
            }
        }

        return true;
    }

    // Initialise a map of days off and corresponding chef who requested that
    // many number of leaves
    private static void initializeDaysOffCount(HashMap<Integer, ArrayList<String>> dayOffCount) {
        for (int i = 0; i < 7; i++) {
            dayOffCount.put(i, new ArrayList<>());
        }
    }

    // Initialise default value for the number of shifts in days for a chef.
    private static void initializeChefsCount(Set<String> set, HashMap<String, Integer> chefsCount) {
        set.forEach(chef -> {
            chefsCount.put(chef, 0);
        });
    }

    // Initialise each day of the week with empty list of chefs
    private static void initializeSchedule(ArrayList<ArrayList<String>> weekSchedule) {
        for (int i = 0; i < DAYS_COUNT; i++) {
            weekSchedule.add(new ArrayList<>());
        }
    }


    // Initialise daysIndices to get the weekday index in constant time
    private static void initializeDaysIndices(HashMap<String, Integer> daysIndices) {
        daysIndices.put("mon", 0);
        daysIndices.put("tue", 1);
        daysIndices.put("wed", 2);
        daysIndices.put("thu", 3);
        daysIndices.put("fri", 4);
        daysIndices.put("sat", 5);
        daysIndices.put("sun", 6);
    }
}