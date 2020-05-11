package samplePrograms.core;

class Multithread {
	public void printCount() {
		try {
			for (int i = 5; i > 0; i--) {
				System.out.println("Counter --- " + i);
			}
		} catch (Exception e) {
			System.out.println("Thread interrupted.");
		}
	}
}

class NewThread extends Multithread {
	private NewThread t;
	private String threadName;
	Multithread MT;

	NewThread(String name, Multithread mt) {
		threadName = name;
		MT = mt;
	}

	public void run() {
		synchronized (MT) {
			MT.printCount();
		}
		System.out.println("Thread " + threadName + " exiting.");
	}

	public void start() {
		System.out.println("Starting " + threadName);
		if (t == null) {
			t = new NewThread(threadName, this);
			t.start();
		}
	}
}

public class Ransient {
	public static void main(String args[]) {
		Multithread MT = new Multithread();
		NewThread T = new NewThread("Thread - 1 ", MT);
		NewThread T1 = new NewThread("Thread - 2 ", MT);
		T.start();
		T1.start(); // wait for threads to end
	}
}