package samplePrograms.core.threading;

public class ThreadJoin extends Thread {
	public void run() {
		for (int i = 1; i <= 4; i++) {
			try {
				Thread.sleep(500);
			} catch (Exception e) {
				System.out.println(e);
			}
			System.out.println(i);
		}
	}

	public static void main(String args[]) {
		ThreadJoin th1 = new ThreadJoin();
		ThreadJoin th2 = new ThreadJoin();
		ThreadJoin th3 = new ThreadJoin();
		th1.start();
		try {
			// This join will let thread1 first complete its task, then thread2 and thread3
			// will execute.
			// Main thread is waiting for th1 to die
			th1.join();
		} catch (Exception e) {
			System.out.println(e);
		}

		th2.start();
		th3.start();
	}
}